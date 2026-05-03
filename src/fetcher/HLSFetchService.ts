import { createDecipheriv } from 'crypto';
import { Writable } from 'stream';
import { DownloadOptions, VideoQuality } from '../util';

export class HLSFetchService {
	public async fetchHlsStream(
		manifest: string,
		manifestUrl: string,
		timeoutMs: number,
		stream: Writable,
		opts?: DownloadOptions
	): Promise<void> {
		const variant = this.selectVariant(manifest, manifestUrl, opts?.avq);
		const playlistUrl = variant ?? manifestUrl;

		const requestHeaders = this.buildHeaders(opts);

		const mediaManifest = variant && variant !== manifestUrl ? await this.fetchText(variant, timeoutMs, requestHeaders) : manifest;

		const segments = this.parseSegments(mediaManifest, playlistUrl);
		if (!segments.length) throw new Error('No segments');

		const keyInfo = this.parseKey(mediaManifest, playlistUrl);
		const key = keyInfo ? await this.fetchKey(keyInfo.url) : null;

		await this.worker(segments, key, keyInfo, timeoutMs, stream, requestHeaders);
	}

	private buildHeaders(opts?: DownloadOptions) {
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

	private async worker(
		segments: string[],
		key: Buffer | null,
		keyInfo: { url: string; iv: Buffer | undefined } | null,
		timeoutMs: number,
		stream: Writable,
		headers: Record<string, any>
	) {
		const concurrency = 8;
		const results = new Map<number, Buffer>();
		let nextIndexToWrite = 0;
		let currentIndex = 0;

		const worker = async () => {
			while (true) {
				const i = currentIndex++;
				if (i >= segments.length) break;

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

					data = this.decrypt(data, key, iv);
				}

				results.set(i, data);

				// Ordered write with backpressure
				while (results.has(nextIndexToWrite)) {
					const chunk = results.get(nextIndexToWrite)!;
					results.delete(nextIndexToWrite);

					if (!stream.write(chunk)) {
						await new Promise((resolve) => stream.once('drain', resolve));
					}

					nextIndexToWrite++;
				}
			}
		};

		await Promise.all(Array.from({ length: concurrency }, worker));

		// Ensure everything is written if any workers finished early
		while (results.has(nextIndexToWrite)) {
			const chunk = results.get(nextIndexToWrite)!;
			results.delete(nextIndexToWrite);

			if (!stream.write(chunk)) {
				await new Promise((resolve) => stream.once('drain', resolve));
			}

			nextIndexToWrite++;
		}
	}

	public isHlsManifest(contentType: string, url: string) {
		return contentType.includes('mpegurl') || url.includes('.m3u8');
	}

	private parseSegments(manifest: string, base: string): string[] {
		return manifest
			.split('\n')
			.map((l) => l.trim())
			.filter((l) => l && !l.startsWith('#'))
			.map((l) => new URL(l, base).toString());
	}

	private selectVariant(manifest: string, base: string, preferred?: VideoQuality): string | null {
		const lines = manifest.split('\n');

		const variants: {
			url: string;
			width: number;
			height: number;
			bw: number;
		}[] = [];

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

	private parseKey(manifest: string, base: string) {
		const match = manifest.match(/URI="([^"]+)"(?:,IV=0x([0-9a-fA-F]+))?/);
		if (!match) return null;

		return {
			url: new URL(match[1], base).toString(),
			iv: match[2] ? Buffer.from(match[2], 'hex') : undefined
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

	private async fetchText(url: string, timeoutMs: number, headers: Record<string, any>) {
		return (await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers })).text();
	}

	private async fetchWithRetry(url: string, timeoutMs: number, headers: Record<string, any>, retries = 3): Promise<Buffer> {
		let err: unknown;

		for (let i = 0; i < retries; i++) {
			try {
				const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers });

				if (!res.ok) throw new Error();

				return Buffer.from(await res.arrayBuffer());
			} catch (e) {
				err = e;
			}
		}

		throw err;
	}
}
