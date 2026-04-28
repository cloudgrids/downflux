import { Dispatcher, Pool, interceptors } from 'undici';
import { IncomingHttpHeaders } from 'undici/types/header';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';
import { HttpFetchOptions } from '../types/HttpFetchOptions';

export interface FetchResult {
	html: string;
	buffer: Buffer;
	finalUrl: string;
	status: number;
	ok: boolean;
	headers: Record<string, string>;
}

export class HttpFetcherService {
	private readonly DEFAULT_HEADERS: Record<string, string> = {
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Language': 'en-US,en;q=0.5',
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

	public async fetchHtml(url: string, opts: HttpFetchOptions = {}): Promise<FetchResult> {
		const { headers = {}, timeoutMs = 30_000, retries = 3 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, ...headers } as Record<string, string>;
		let lastError: unknown;

		for (let attempt = 0; attempt < retries; attempt++) {
			try {
				const pool = this.getPool(url);
				const parsedUrl = new URL(url);

				const {
					statusCode,
					headers: resHeaders,
					body,
					context
				} = await pool.request({
					path: parsedUrl.pathname + parsedUrl.search,
					method: 'GET',
					headers: mergedHeaders,
					headersTimeout: timeoutMs,
					bodyTimeout: timeoutMs
				});

				const contextData = context as { history?: URL[] };
				const finalUrl = contextData?.history
					? contextData.history.length > 0
						? contextData.history[contextData.history.length - 1].toString()
						: url
					: url;
				const ok = statusCode >= 200 && statusCode < 300;

				const html = this.decodeBody(await this.readBody(body), resHeaders).toString('utf8');

				return {
					html,
					finalUrl,
					status: statusCode,
					ok,
					headers: this.headers(resHeaders),
					buffer: Buffer.from(html)
				};
			} catch (err) {
				lastError = err;
			}
		}

		throw lastError;
	}

	public async fetchBuffer(url: string, opts: HttpFetchOptions): Promise<FetchResult> {
		const { headers = {}, retries = 3 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, Accept: '*/*', ...headers } as Record<string, string>;
		let lastError: unknown;

		for (let attempt = 0; attempt < retries; attempt++) {
			try {
				const pool = this.getPool(url);
				const parsedUrl = new URL(url);

				const {
					statusCode,
					body,
					headers: resHeaders,
					context
				} = await pool.request({
					path: parsedUrl.pathname + parsedUrl.search,
					method: 'GET',
					headers: mergedHeaders,
					bodyTimeout: 0
				});

				const ok = statusCode >= 200 && statusCode < 300;
				if (!ok) throw new Error(`HTTP ${statusCode} for ${url}`);

				const contextData = context as { history?: URL[] };

				const finalUrl = contextData?.history
					? contextData.history.length > 0
						? contextData.history[contextData.history.length - 1].toString()
						: url
					: url;

				return {
					buffer: this.decodeBody(await this.readBody(body), resHeaders),
					finalUrl,
					headers: this.headers(resHeaders),
					html: '',
					status: statusCode,
					ok
				};
			} catch (err) {
				console.warn(`Fetch attempt ${attempt + 1} for ${url} failed:`, err instanceof Error ? err.message : err);
				lastError = err;
			}
		}

		throw lastError;
	}

	private async readBody(body: AsyncIterable<unknown>): Promise<Buffer> {
		const chunks: Buffer[] = [];
		for await (const chunk of body) {
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as ArrayBuffer));
		}
		return Buffer.concat(chunks);
	}

	private decodeBody(buffer: Buffer, headers: IncomingHttpHeaders): Buffer {
		const responseHeaders = this.headers(headers);

		const encoding = responseHeaders['content-encoding']?.toLowerCase();
		if (!encoding) return buffer;

		if (encoding.includes('gzip')) return gunzipSync(buffer);
		if (encoding.includes('deflate')) return inflateSync(buffer);
		if (encoding.includes('br')) return brotliDecompressSync(buffer);

		return buffer;
	}

	private headers(headers: IncomingHttpHeaders): Record<string, string> {
		const result: Record<string, string> = {};
		for (const [key, value] of Object.entries(headers)) {
			if (Array.isArray(value)) result[key] = value.join(', ');
			else if (value) result[key] = value;
		}
		return result;
	}
}
