import { BaseHttpClient } from '@base';
import { DownloadOptions, M3U8Variant } from '@contracts';
import { ProgressManager } from '@core/progress';
import { mapQualityToHeight } from '@shared';
import { VideoQuality } from '@types';
import { createDecipheriv } from 'crypto';
import { once } from 'events';
import { Readable, Writable } from 'stream';

export interface ParseKey {
	url: string;
	iv?: Buffer;
}

/**
 * HTTP engine for HLS playlists and media segments.
 *
 * @remarks
 * HLS handling is isolated from generic streaming because playlists require
 * variant selection, segment stitching, optional AES decryption, and fMP4
 * detection before storage can finalize the media.
 */
export class HlsClient extends BaseHttpClient {
	constructor(progressManager: ProgressManager) {
		super(progressManager);
	}

	/**
	 * Writes a resolved HLS playlist to a destination stream.
	 *
	 * @param manifest Already fetched manifest content.
	 * @param manifestUrl URL used to resolve relative playlist entries.
	 * @param timeoutMs Segment request timeout.
	 * @param stream Destination stream.
	 * @param opts Download and quality options.
	 */
	public async fetchHlsStream(
		manifest: string,
		manifestUrl: string,
		timeoutMs: number,
		stream: Writable,
		opts: DownloadOptions
	): Promise<void> {
		const variant = this.selectVariant(manifest, manifestUrl, opts);
		const playlistUrl = variant ?? manifestUrl;

		const requestHeaders = this.buildHlsHeaders(opts);

		const mediaManifest = variant && variant !== manifestUrl ? await this.fetchText(variant, timeoutMs, requestHeaders) : manifest;

		const initUrl = this.parseInitSegment(mediaManifest, playlistUrl);
		const isFmp4 = !!initUrl;

		let segments = this.parseSegments(mediaManifest, playlistUrl);
		if (!segments.length) throw new Error('No segments found to manifest');

		// disable decrypt for fMP4
		const keyInfo = isFmp4 ? null : this.parseKey(mediaManifest, playlistUrl);
		const key = keyInfo ? await this.fetchKey(keyInfo.url) : null;

		if (initUrl) segments = [initUrl, ...segments];

		await this.stitchSegments(segments, key, keyInfo, timeoutMs, stream, requestHeaders);
	}

	/**
	 * Detects whether the selected playlist uses fMP4 initialization segments.
	 *
	 * @param manifest Manifest content.
	 * @param manifestUrl URL used to resolve relative entries.
	 * @param opts Download and quality options.
	 * @returns `true` when an fMP4 init segment is present.
	 */
	public async isFmp4(manifest: string, manifestUrl: string, opts: DownloadOptions): Promise<boolean> {
		const variant = this.selectVariant(manifest, manifestUrl, opts);
		const playlistUrl = variant ?? manifestUrl;

		const requestHeaders = this.buildHlsHeaders(opts);

		const mediaManifest =
			variant && variant !== manifestUrl ? await this.fetchText(variant, opts?.timeoutMs ?? 30_0000, requestHeaders) : manifest;

		const initUrl = this.parseInitSegment(mediaManifest, playlistUrl);
		return !!initUrl;
	}

	private parseInitSegment(manifest: string, base: string): string | null {
		const match = manifest.match(/#EXT-X-MAP:URI="([^"]+)"/);
		if (!match) return null;

		return new URL(match[1], base).toString();
	}

	private async fetchStream(url: string, headers: Record<string, string>, timeoutMs: number): Promise<NodeJS.ReadableStream> {
		const retries = 3;

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });

				if (!res.ok || !res.body) throw new Error(`Failed segment: ${url} (${res.status})`);

				return Readable.fromWeb(res.body as any);
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));
				if (attempt < retries) {
					this.progressManager.update({
						message: `Error fetching segment ${url}: ${(error as Error).message}. Retrying... (${attempt + 1}/${retries})`
					});
					await new Promise((res) => setTimeout(res, 1000 * (attempt + 1)));
					continue;
				}
			}
		}
		throw lastError;
	}

	private withDecrypt(readable: NodeJS.ReadableStream, i: number, key: Buffer | null, keyInfo: ParseKey | null): NodeJS.ReadableStream {
		if (!key) return readable;

		this.progressManager.update({
			message: `Decrypting segment ${i + 1} with key ${keyInfo?.url} and IV ${keyInfo?.iv?.toString('hex')}`
		});

		const iv = keyInfo?.iv
			? keyInfo.iv
			: (() => {
					const b = Buffer.alloc(16, 0);
					b.writeUInt32BE(i, 12);
					return b;
				})();

		const decipher = createDecipheriv('aes-128-cbc', key, iv);
		return readable.pipe(decipher);
	}

	// Helper: pipe ONE segment into the destination stream (no listener leak)

	private async pipeOne(readable: NodeJS.ReadableStream, stream: Writable): Promise<void> {
		for await (const chunk of readable) {
			if (!stream.write(chunk)) {
				await once(stream, 'drain');
			}
		}
	}

	private async stitchSegments(
		segments: string[],
		key: Buffer | null,
		keyInfo: ParseKey | null,
		timeoutMs: number,
		stream: Writable,
		headers: Record<string, any>
	): Promise<void> {
		if (!segments.length) return;

		const total = segments.length;

		this.progressManager.update({ totalSegments: total, message: 'Starting to stream segments...' });

		// --- Prefetch 1 ahead ---
		let nextPromise: Promise<NodeJS.ReadableStream> | null = this.fetchStream(segments[0], headers, timeoutMs);

		for (let i = 0; i < total; i++) {
			// current segment stream
			const currentReadable = await nextPromise!;

			// kick off prefetch for next segment (if any)
			if (i + 1 < total) nextPromise = this.fetchStream(segments[i + 1], headers, timeoutMs);
			else nextPromise = null;

			// optional decrypt
			const readable = this.withDecrypt(currentReadable, i, key, keyInfo);

			// write this segment fully before moving on
			await this.pipeOne(readable, stream);

			// progress callback (segment-level)
			this.progressManager.update({ resolvedSegments: i + 1, currentSegment: segments[i] });
		}
	}

	/**
	 * Checks whether a response should be handled as an HLS manifest.
	 *
	 * @param contentType Response content type.
	 * @param url Final response URL.
	 * @returns `true` when the response appears to be an HLS playlist.
	 */
	public isHlsManifest(contentType: string, url: string): boolean {
		return contentType.includes('application/vnd.apple.mpegurl') || url.includes('.m3u8');
	}

	private parseSegments(manifest: string, base: string): string[] {
		return manifest
			.split('\n')
			.map((l) => l.trim())
			.filter((l) => l && !l.startsWith('#'))
			.map((l) => new URL(l, base).toString());
	}

	private getVariants(manifest: string, base: string): M3U8Variant[] {
		const lines = manifest.split('\n');
		const variants: M3U8Variant[] = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			if (!line.includes('#EXT-X-STREAM-INF')) continue;

			const bw = parseInt(line.match(/BANDWIDTH=(\d+)/)?.[1] || '0', 10);

			const resMatch = line.match(/RESOLUTION=(\d+)x(\d+)/);
			const width = resMatch ? parseInt(resMatch[1], 10) : 0;
			const height = resMatch ? parseInt(resMatch[2], 10) : 0;

			const next = lines[i + 1];

			if (next && !next.startsWith('#')) {
				variants.push({
					url: new URL(next, base).toString(),
					width,
					height,
					bw
				});
			}
		}

		return variants;
	}

	private selectVariant(manifest: string, base: string, opts: DownloadOptions): string | null {
		const variants = this.getVariants(manifest, base);
		const { allowedVideoQuality } = opts;

		if (!variants.length) return null;

		// Sort by resolution first, fallback to bandwidth
		variants.sort((a, b) => {
			if (b.height !== a.height) return b.height - a.height;
			if (b.width !== a.width) return b.width - a.width;
			return b.bw - a.bw;
		});

		this.progressManager.update({ message: 'Selecting variants from manifest' });

		// If no preference, return best
		if (!allowedVideoQuality || allowedVideoQuality === VideoQuality.QUnknown) return variants[0].url;

		const targetHeight = mapQualityToHeight(allowedVideoQuality);

		// 1. Best match <= target
		const belowOrEqual = variants.find((v) => v.height <= targetHeight && v.height > 0);
		if (belowOrEqual) return belowOrEqual.url;

		// 2. Smallest above target
		const above = [...variants]
			.reverse() // smallest first
			.find((v) => v.height > targetHeight);

		if (above) return above.url;

		// 3. Final fallback
		return variants[0].url;
	}

	private parseKey(manifest: string, base: string): ParseKey | null {
		const match = manifest.match(/#EXT-X-KEY:METHOD=AES-128,URI="([^"]+)"/);

		this.progressManager.update({ message: `Parsing key from manifest... ${!!match}` });

		if (!match) return null;

		return {
			url: new URL(match[1], base).toString(),
			iv: undefined
		};
	}

	private async fetchKey(url: string): Promise<Buffer<ArrayBuffer>> {
		const res = await fetch(url);
		return Buffer.from(await res.arrayBuffer());
	}
}
