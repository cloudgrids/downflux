import { createDecipheriv } from 'crypto';
import { Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Dispatcher, Pool, interceptors } from 'undici';
import { IncomingHttpHeaders } from 'undici/types/header';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';
import { DownloadOptions } from '../downloaders';
import { HttpFetchOptions } from '../types';

export interface FetchResult {
	html: string;
	buffer: Buffer;
	finalUrl: string;
	status: number;
	ok: boolean;
	headers: Record<string, string>;
}

export interface HLSStreamRequest {
	finalUrl: string;
	headers: Record<string, string>;
	start: (stream: Writable) => Promise<void>;
}

export class HttpFetcherService {
	private readonly DEFAULT_HEADERS: Record<string, string> = {
		'User-Agent': 'Mozilla/5.0',
		'Accept': '*/*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Connection': 'keep-alive'
	};

	private readonly pools = new Map<string, Dispatcher>();

	private getPool(url: string): Dispatcher {
		const origin = new URL(url).origin;
		if (!this.pools.has(origin)) {
			const pool = new Pool(origin).compose(interceptors.redirect({ maxRedirections: 10 }));
			this.pools.set(origin, pool);
		}
		return this.pools.get(origin)!;
	}

	public async fetchHtml(url: string, opts: HttpFetchOptions): Promise<FetchResult> {
		const { headers = {}, timeoutMs = 30_000 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, Referer: opts.referer, ...headers } as Record<string, string>;

		const pool = this.getPool(url);
		const parsed = new URL(url);

		const {
			statusCode,
			headers: resHeaders,
			body
		} = await pool.request({
			path: parsed.pathname + parsed.search,
			method: 'GET',
			headers: mergedHeaders,
			headersTimeout: timeoutMs,
			bodyTimeout: timeoutMs
		});

		const buffer = this.decodeBody(await this.readBody(body), resHeaders);

		return {
			html: buffer.toString('utf8'),
			buffer,
			finalUrl: url,
			status: statusCode,
			ok: statusCode >= 200 && statusCode < 300,
			headers: this.headers(resHeaders)
		};
	}

	public async requestStream(url: string, opts: DownloadOptions): Promise<HLSStreamRequest> {
		const { headers = {}, timeoutMs = 30_000 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, Referer: opts.referer, ...headers } as Record<string, string>;

		const res = await fetch(url, {
			headers: mergedHeaders,
			signal: AbortSignal.timeout(timeoutMs)
		});

		const finalUrl = res.url || url;
		const contentType = res.headers.get('content-type') || '';
		const responseHeaders = Object.fromEntries(res.headers.entries());

		if (this.isHlsManifest(contentType, finalUrl)) {
			const manifest = await res.text();
			return {
				finalUrl,
				headers: responseHeaders,
				start: (stream: Writable) => this.fetchHlsStream(manifest, finalUrl, timeoutMs, stream)
			};
		}

		return {
			finalUrl,
			headers: responseHeaders,
			start: (stream: Writable) => pipeline(res.body as any, stream)
		};
	}

	private async fetchHlsStream(manifest: string, manifestUrl: string, timeoutMs: number, stream: Writable): Promise<void> {
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

	private isHlsManifest(contentType: string, url: string) {
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

	private async fetchText(url: string, timeoutMs: number) {
		const res = await fetch(url, {
			signal: AbortSignal.timeout(timeoutMs)
		});
		return res.text();
	}

	private async readBody(body: AsyncIterable<any>): Promise<Buffer> {
		const chunks: Buffer[] = [];
		for await (const c of body) chunks.push(Buffer.from(c));
		return Buffer.concat(chunks);
	}

	private decodeBody(buffer: Buffer, headers: IncomingHttpHeaders): Buffer {
		const enc = headers['content-encoding'];
		if (!enc) return buffer;

		if (enc.includes('gzip')) return gunzipSync(buffer);
		if (enc.includes('deflate')) return inflateSync(buffer);
		if (enc.includes('br')) return brotliDecompressSync(buffer);

		return buffer;
	}

	private headers(headers: IncomingHttpHeaders): Record<string, string> {
		return Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : v || '']));
	}
}
