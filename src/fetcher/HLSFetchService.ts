import { createDecipheriv } from 'crypto';
import { Writable } from 'stream';

export class HLSFetchService {
	public async fetchHlsStream(manifest: string, manifestUrl: string, timeoutMs: number, stream: Writable): Promise<void> {
		const variant = this.selectVariant(manifest, manifestUrl);
		const playlistUrl = variant ?? manifestUrl;

		const mediaManifest = variant && variant !== manifestUrl ? await this.fetchText(variant, timeoutMs) : manifest;

		const segments = this.parseSegments(mediaManifest, playlistUrl);
		if (!segments.length) throw new Error('No segments');

		const keyInfo = this.parseKey(mediaManifest, playlistUrl);
		const key = keyInfo ? await this.fetchKey(keyInfo.url) : null;

		await this.worker(segments, key, keyInfo, timeoutMs, stream);
	}

	private async worker(
		segments: string[],
		key: Buffer | null,
		keyInfo: { url: string; iv: Buffer | undefined } | null,
		timeoutMs: number,
		stream: Writable
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
				let data = await this.fetchWithRetry(segUrl, timeoutMs);

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

	private selectVariant(manifest: string, base: string): string | null {
		const lines = manifest.split('\n');
		const variants: { url: string; bw: number }[] = [];

		for (let i = 0; i < lines.length; i++) {
			if (!lines[i].includes('STREAM-INF')) continue;

			const bw = parseInt(lines[i].match(/BANDWIDTH=(\d+)/)?.[1] || '0');
			const next = lines[i + 1];

			if (next && !next.startsWith('#')) {
				variants.push({
					url: new URL(next, base).toString(),
					bw
				});
			}
		}

		variants.sort((a, b) => b.bw - a.bw);

		return variants[0]?.url ?? null;
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

	private async fetchText(url: string, timeoutMs: number) {
		const res = await fetch(url, {
			signal: AbortSignal.timeout(timeoutMs)
		});
		return res.text();
	}

	private async fetchWithRetry(url: string, timeoutMs: number, retries = 3): Promise<Buffer> {
		let err: unknown;

		for (let i = 0; i < retries; i++) {
			try {
				const res = await fetch(url, {
					signal: AbortSignal.timeout(timeoutMs)
				});
				if (!res.ok) throw new Error();
				return Buffer.from(await res.arrayBuffer());
			} catch (e) {
				err = e;
			}
		}

		throw err;
	}
}
