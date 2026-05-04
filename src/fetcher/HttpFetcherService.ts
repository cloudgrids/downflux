import { Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Dispatcher, Pool, interceptors } from 'undici';
import { IncomingHttpHeaders } from 'undici/types/header';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';
import { detectHlsContainer } from '../helpers/DetectHlsContainer';
import { DownloadOptions, FetchResult, HLSStreamRequest, HttpFetchOptions } from '../util';
import { HLSFetchService } from './HLSFetchService';

export class HttpFetcherService {
	private readonly hlsFetchService = new HLSFetchService();
	private readonly DEFAULT_HEADERS: Record<string, string> = {
		'User-Agent': 'Mozilla/5.0',
		'Accept': '*/*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Connection': 'keep-alive'
	};

	private readonly pools = new Map<string, Dispatcher>();

	private fakeIP() {
		return Array(4)
			.fill(0)
			.map(() => Math.floor(Math.random() * 255))
			.join('.');
	}

	private getPool(url: string): Dispatcher {
		const origin = new URL(url).origin;
		if (!this.pools.has(origin)) {
			const pool = new Pool(origin).compose(interceptors.redirect({ maxRedirections: 10 }));
			this.pools.set(origin, pool);
		}
		return this.pools.get(origin)!;
	}

	public async fetchHtml(url: string, opts: HttpFetchOptions): Promise<FetchResult> {
		const { headers = {}, timeoutMs = 30_000, retries = 3 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, 'Referer': opts.referer, ...headers, 'X-Forwarded-For': this.fakeIP() };

		const parsed = new URL(url);
		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			const pool = this.getPool(url);

			try {
				const {
					statusCode,
					headers: resHeaders,
					body
				} = await pool.request({
					path: parsed.pathname + parsed.search,
					method: 'GET',
					headers: { ...mergedHeaders, 'X-Forwarded-For': this.fakeIP() },
					headersTimeout: timeoutMs,
					bodyTimeout: timeoutMs
				});

				if (statusCode === 404) {
					return {
						html: '',
						buffer: Buffer.alloc(0),
						finalUrl: url,
						status: statusCode,
						ok: false,
						headers: this.headers(resHeaders)
					};
				}

				if (statusCode === 429 || statusCode >= 500) {
					await this.delay(attempt);
					continue;
				}

				const buffer = this.decodeBody(await this.readBody(body), resHeaders);

				return {
					html: buffer.toString('utf8'),
					buffer,
					finalUrl: url,
					status: statusCode,
					ok: statusCode >= 200 && statusCode < 300,
					headers: this.headers(resHeaders)
				};
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				if (attempt < retries) {
					await this.delay(attempt);
					continue;
				}
			}
		}
		throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts: ${lastError?.message}`);
	}

	private async delay(attempt: number) {
		const base = 300; // ms
		const jitter = Math.random() * 200;
		const delay = base * 2 ** attempt + jitter;
		return new Promise((res) => setTimeout(res, delay));
	}

	public async requestStream(url: string, opts: DownloadOptions): Promise<HLSStreamRequest> {
		const { headers = {}, timeoutMs = 30_000, retries = 3 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, 'Referer': opts.referer, ...headers, 'X-Forwarded-For': this.fakeIP() };

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const res = await fetch(url, {
					headers: { ...mergedHeaders, 'X-Forwarded-For': this.fakeIP() } as Record<string, string>,
					signal: AbortSignal.timeout(timeoutMs),
					redirect: 'follow',
					referrer: opts.referer
				});

				const finalUrl = res.url || url;
				const contentType = res.headers.get('content-type') || '';
				const responseHeaders = Object.fromEntries(res.headers.entries());

				if (res.status === 404) throw new Error(`Resource not found: ${url}`);
				if (res.status === 429 || res.status >= 500) {
					await this.delay(attempt);
					continue;
				}

				if (this.hlsFetchService.isHlsManifest(contentType, finalUrl)) {
					/**
					 * references file with extensions .m3u or content-type containing 'mpegurl'
					 * For more reference check the HLSManifest.m3u file in the src/fetcher directory
					 */
					const manifest = await res.text();
					const type = detectHlsContainer(manifest);
					return {
						finalUrl,
						headers: { ...responseHeaders, 'x-hls-container': type },
						start: (stream: Writable) => this.hlsFetchService.fetchHlsStream(manifest, finalUrl, timeoutMs, stream, opts)
					};
				}

				return {
					finalUrl,
					headers: responseHeaders,
					start: (stream: Writable) => pipeline(res.body as any, stream)
				};
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				if (attempt < retries) {
					await this.delay(attempt);
					continue;
				}
			}
		}
		throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts: ${lastError?.message}`);
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
