import { createDecipheriv } from 'crypto';
import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { DownloadOptions, M3U8Variant, VideoQuality } from '../util';

export interface ParseKey {
	url: string;
	iv?: Buffer;
}

export class HLSFetchService {
	public async fetchHlsStream(
		manifest: string,
		manifestUrl: string,
		timeoutMs: number,
		stream: Writable,
		opts: DownloadOptions
	): Promise<void> {
		const variant = this.selectVariant(manifest, manifestUrl, opts);
		const playlistUrl = variant ?? manifestUrl;

		const requestHeaders = this.buildHeaders(opts);

		const mediaManifest = variant && variant !== manifestUrl ? await this.fetchText(variant, timeoutMs, requestHeaders) : manifest;

		const segments = this.parseSegments(mediaManifest, playlistUrl);
		if (!segments.length) throw new Error('NO SEGMENTS FOUND IN MANIFEST');

		const initUrl = this.parseInitSegment(mediaManifest, playlistUrl);
		const isFmp4 = !!initUrl;

		// disable decrypt for fMP4
		const keyInfo = isFmp4 ? null : this.parseKey(mediaManifest, playlistUrl, opts);
		const key = keyInfo ? await this.fetchKey(keyInfo.url) : null;

		if (initUrl) {
			const fetchInit = await this.fetchStream(initUrl, requestHeaders, timeoutMs);

			if (!fetchInit) throw new Error('Failed to fetch init segment');

			await pipeline(fetchInit, stream, { end: false });
		}

		await this.stitchSegments(segments, key, keyInfo, timeoutMs, stream, requestHeaders, opts);
	}

	private buildHeaders(opts: DownloadOptions) {
		return {
			'User-Agent': 'Mozilla/5.0',
			'Accept': '*/*',
			'Referer': opts?.referer || '',
			'Origin': opts?.referer ? new URL(opts.referer).origin : ''
		};
	}

	private mapQualityToHeight(q: VideoQuality): number {
		switch (q) {
			case VideoQuality.Q144:
				return 144;
			case VideoQuality.Q240:
				return 240;
			case VideoQuality.Q360:
				return 360;
			case VideoQuality.Q480:
				return 480;
			case VideoQuality.Q720:
				return 720;
			case VideoQuality.Q1080:
				return 1080;
			case VideoQuality.Q1440:
				return 1440;
			case VideoQuality.Q2160:
				return 2160;
			case VideoQuality.Q4320:
				return 4320;
			default:
				return 0;
		}
	}

	private parseInitSegment(manifest: string, base: string): string | null {
		const match = manifest.match(/#EXT-X-MAP:URI="([^"]+)"/);
		if (!match) return null;

		return new URL(match[1], base).toString();
	}

	private async fetchStream(url: string, headers: Record<string, string>, timeoutMs: number): Promise<NodeJS.ReadableStream> {
		const res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });

		if (!res.ok || !res.body) throw new Error(`Failed segment: ${url} (${res.status})`);

		return Readable.fromWeb(res.body as any);
	}

	private withDecrypt(readable: NodeJS.ReadableStream, i: number, key: Buffer | null, keyInfo: ParseKey | null): NodeJS.ReadableStream {
		if (!key) return readable;

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
	private pipeOne(readable: NodeJS.ReadableStream, stream: Writable): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const onError = (err: Error) => {
				cleanup();
				reject(err);
			};
			const onEnd = () => {
				cleanup();
				resolve();
			};
			const cleanup = () => {
				readable.removeListener('error', onError);
				readable.removeListener('end', onEnd);
			};

			readable.once('error', onError);
			readable.once('end', onEnd);

			// Important: do NOT end the destination stream here
			readable.pipe(stream, { end: false });
		});
	}

	private async stitchSegments(
		segments: string[],
		key: Buffer | null,
		keyInfo: ParseKey | null,
		timeoutMs: number,
		stream: Writable,
		headers: Record<string, any>,
		opts: DownloadOptions
	) {
		if (!segments.length) return;

		const total = segments.length;

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
			opts?.onSegmentProgress?.({ segment: i + 1, totalSegments: total, status: 'HLS-SEGMENTING' });
		}
	}

	public isHlsManifest(contentType: string, url: string): boolean {
		return contentType.includes('mpegurl') || url.includes('.m3u8');
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
		const { allowedVideoQuality, onSegmentProgress } = opts;

		if (!variants.length) return null;

		// Sort by resolution first, fallback to bandwidth
		variants.sort((a, b) => {
			if (b.height !== a.height) return b.height - a.height;
			if (b.width !== a.width) return b.width - a.width;
			return b.bw - a.bw;
		});

		onSegmentProgress?.({
			status: 'HLS-SEGMENTING',
			message: `Preferred Quality: ${allowedVideoQuality ?? 'unknown'}\nFetched Variants length:${variants.length}}`
		});

		// If no preference, return best
		if (!allowedVideoQuality || allowedVideoQuality === VideoQuality.QUnknown) return variants[0].url;

		const targetHeight = this.mapQualityToHeight(allowedVideoQuality);

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

	private parseKey(manifest: string, base: string, opts: DownloadOptions): ParseKey | null {
		opts.onSegmentProgress?.({ status: 'HLS-SEGMENTING', message: 'Parsing key from manifest...' });

		const match = manifest.match(/#EXT-X-KEY:METHOD=AES-128,URI="([^"]+)"/);

		if (!match) return null;

		return {
			url: new URL(match[1], base).toString(),
			iv: undefined
		};
	}

	private async fetchKey(url: string) {
		const res = await fetch(url);
		return Buffer.from(await res.arrayBuffer());
	}

	private async fetchText(url: string, timeoutMs: number, headers: Record<string, any>): Promise<string> {
		return (await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers })).text();
	}
}
