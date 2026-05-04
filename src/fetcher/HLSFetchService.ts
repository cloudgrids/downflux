import { createDecipheriv } from 'crypto';
import { Writable } from 'stream';
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
		const variant = this.selectVariant(manifest, manifestUrl, opts?.avq);
		const playlistUrl = variant ?? manifestUrl;

		const requestHeaders = this.buildHeaders(opts);

		const mediaManifest = variant && variant !== manifestUrl ? await this.fetchText(variant, timeoutMs, requestHeaders) : manifest;

		const segments = this.parseSegments(mediaManifest, playlistUrl);
		if (!segments.length) throw new Error('No segments');

		const initUrl = this.parseInitSegment(mediaManifest, playlistUrl);
		const isFmp4 = !!initUrl;

		// disable decrypt for fMP4
		const keyInfo = isFmp4 ? null : this.parseKey(mediaManifest, playlistUrl);
		const key = keyInfo ? await this.fetchKey(keyInfo.url) : null;

		if (initUrl) {
			const initData = await this.fetchWithRetry(initUrl, timeoutMs, requestHeaders);

			if (!stream.write(initData)) {
				await new Promise((res) => stream.once('drain', res));
			}
		}

		await this.stitchSegments(segments, key, keyInfo, timeoutMs, stream, requestHeaders);
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

	// do not collect everything, stream progressively.
	private async stitchSegments(
		segments: string[],
		key: Buffer | null,
		keyInfo: ParseKey | null,
		timeoutMs: number,
		stream: Writable,
		headers: Record<string, any>
	) {
		const concurrency = 4;

		let nextToWrite = 0;
		let nextToFetch = 0;

		const buffer = new Map<number, Buffer>();
		const inFlight = new Set<Promise<void>>();

		while (nextToWrite < segments.length) {
			// fill concurrency window
			while (inFlight.size < concurrency && nextToFetch < segments.length) {
				const p = this.fetchAndStore(nextToFetch++, buffer, segments, key, keyInfo, timeoutMs, headers, stream);
				inFlight.add(p);
				p.finally(() => inFlight.delete(p));
			}

			// ordered writing
			if (buffer.has(nextToWrite)) {
				const chunk = buffer.get(nextToWrite)!;
				buffer.delete(nextToWrite);

				if (!stream.write(chunk)) {
					await new Promise((r) => stream.once('drain', r));
				}

				nextToWrite++;
				continue;
			}

			// do not await inside the loop except for drain, to allow concurrent fetching
			await Promise.race([Promise.allSettled(inFlight), new Promise((r) => setTimeout(r, 10))]);
		}
	}

	// fetches and stores in buffer, does not wait for turn to write
	private async fetchAndStore(
		i: number,
		buffer: Map<number, Buffer>,
		segments: string[],
		key: Buffer | null,
		keyInfo: ParseKey | null,
		timeoutMs: number,
		headers: Record<string, any>,
		stream: Writable
	) {
		try {
			const segUrl = segments[i];
			let data = await this.fetchWithRetry(segUrl, timeoutMs, headers);

			if (key) {
				const iv = keyInfo?.iv
					? keyInfo.iv
					: (() => {
							const b = Buffer.alloc(16, 0);
							b.writeUInt32BE(i, 12);
							return b;
						})();

				try {
					data = this.decrypt(data, key, iv);
				} catch {
					console.warn('Decrypt failed, using raw segment', { segUrl });
				}
			}

			buffer.set(i, data);
		} catch (err) {
			stream.destroy(err instanceof Error ? err : new Error(String(err)));
			throw err;
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

	private selectVariant(manifest: string, base: string, preferred?: VideoQuality): string | null {
		const variants = this.getVariants(manifest, base);

		if (!variants.length) return null;

		// Sort by resolution first, fallback to bandwidth
		variants.sort((a, b) => {
			if (b.height !== a.height) return b.height - a.height;
			if (b.width !== a.width) return b.width - a.width;
			return b.bw - a.bw;
		});

		// If no preference, return best
		if (!preferred || preferred === VideoQuality.QUnknown) return variants[0].url;

		const targetHeight = this.mapQualityToHeight(preferred);

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
		console.log('Parsing key from manifest...');
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

	private decrypt(data: Buffer, key: Buffer, iv: Buffer) {
		const d = createDecipheriv('aes-128-cbc', key, iv);
		return Buffer.concat([d.update(data), d.final()]);
	}

	private async fetchText(url: string, timeoutMs: number, headers: Record<string, any>): Promise<string> {
		return (await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers })).text();
	}

	private async fetchWithRetry(url: string, timeoutMs: number, headers: Record<string, any>, retries = 3): Promise<Buffer> {
		let err: unknown;

		for (let i = 0; i < retries; i++) {
			try {
				const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers });

				if (!res.ok) throw new Error();

				console.log(`Fetched segment: ${url} (status: ${res.status})`);

				return Buffer.from(await res.arrayBuffer());
			} catch (e) {
				err = e;
			}
		}

		throw err;
	}
}
