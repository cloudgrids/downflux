import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Dispatcher, Pool, interceptors } from 'undici';
import { IncomingHttpHeaders } from 'undici/types/header';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';
import { DownloadException, NotFoundException } from '../exceptions';
import { detectHlsContainer } from '../helpers/DetectHlsContainer';
import { getFetchStrategy } from '../strategies/Strategies';
import { DownloadOptions, FetchResult, HLSStreamRequest, HttpFetchOptions, JobProgressEvent } from '../util';
import { HLSFetchService } from './HLSFetchService';

export class HttpFetcherService {
	private readonly hlsFetchService = new HLSFetchService();
	private readonly MAX_CDN_FALLBACK = 1;
	private readonly MAX_RE_EXTRACT = 1;
	private readonly Default_HEADERS: Record<string, string> = {
		'User-Agent': 'Mozilla/5.0',
		'Accept': '*/*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Connection': 'keep-alive'
	};

	private readonly pools = new Map<string, Dispatcher>();

	private makeIP() {
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

	private async createPoolRequest(
		url: string,
		dOpts: HttpFetchOptions,
		rOptions: Dispatcher.RequestOptions<null> = { method: 'GET', path: '' }
	): Promise<Dispatcher.ResponseData<null>> {
		const pool = this.getPool(url);

		const parsed = new URL(url);

		return await pool.request({
			...rOptions,
			path: parsed.pathname + parsed.search,
			headers: { ...this.Default_HEADERS, 'Referer': dOpts.referer, ...dOpts.headers, 'X-Forwarded-For': this.makeIP() },
			bodyTimeout: dOpts.timeoutMs,
			headersTimeout: dOpts.timeoutMs,
			idempotent: true
		});
	}

	private async delay(attempt: number) {
		const base = 300; // ms
		const jitter = Math.random() * 200;
		const delay = base * 2 ** attempt + jitter;
		return new Promise((res) => setTimeout(res, delay));
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

	private fetchOutput(finalUrl: string, status: number, headers: IncomingHttpHeaders, buffer: Buffer): FetchResult {
		if (status === 404) {
			return {
				html: '',
				buffer,
				finalUrl,
				status,
				ok: false,
				headers: this.headers(headers)
			};
		}
		return {
			html: buffer.toString('utf8'),
			buffer,
			finalUrl,
			status,
			ok: status >= 200 && status < 300,
			headers: this.headers(headers)
		};
	}

	public async fetchHtml(url: string, opts: HttpFetchOptions): Promise<FetchResult> {
		const { retries = 3 } = opts;

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const { statusCode, headers: resHeaders, body } = await this.createPoolRequest(url, opts);

				if (statusCode === 404) return this.fetchOutput(url, statusCode, resHeaders, Buffer.alloc(0));

				if (statusCode === 429 || statusCode >= 500) {
					await this.delay(attempt);
					continue;
				}

				const buffer = this.decodeBody(await this.readBody(body), resHeaders);

				return this.fetchOutput(url, statusCode, resHeaders, buffer);
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				if (attempt < retries) {
					await this.delay(attempt);
					continue;
				}
			}
		}
		throw new Error(`FAILED TO FETCH ${url} AFTER ${retries + 1} ATTEMPTS: ${lastError?.message}`);
	}

	private async handleServiceAware404(url: string, opts: DownloadOptions): Promise<HLSStreamRequest | null> {
		const strategy = getFetchStrategy(opts.service);

		if (!strategy) return null;

		if (strategy.shouldFallback404?.(url, opts) && (opts.cdnFallbackCount ?? 0) < this.MAX_CDN_FALLBACK) {
			const fallback = strategy.getFallbackUrl?.(url, opts);

			if (fallback && fallback !== url) {
				opts.onProgress?.({ status: 'DOWNLOADING', message: `[${opts.service}] CDN FALLBACK: ${fallback}` });

				return this.requestStream(fallback, { ...opts, cdnFallbackCount: (opts.cdnFallbackCount ?? 0) + 1 });
			}
		}

		if (
			strategy.shouldReExtract?.(url, opts) &&
			opts.reExtract &&
			opts.pipelineItem &&
			(opts.reExtractCount ?? 0) < this.MAX_RE_EXTRACT
		) {
			opts.onProgress?.({ status: 'DOWNLOADING', message: `[${opts.service}] HLS EXPIRED -> RE-EXTRACTING...` });

			const freshItem = await opts.reExtract(opts.pipelineItem);
			const freshUrl = freshItem?.downloadUrl;

			if (freshItem && freshUrl && freshUrl !== url) {
				return this.requestStream(freshUrl, {
					...opts,
					pipelineItem: freshItem,
					referer: freshItem.sourceUrl,
					reExtractCount: (opts.reExtractCount ?? 0) + 1,
					cdnFallbackCount: 0
				});
			}
		}

		return null;
	}

	private async resolveServiceTextResponse(
		url: string,
		contentType: string,
		body: Response,
		opts: DownloadOptions
	): Promise<HLSStreamRequest | null> {
		const strategy = getFetchStrategy(opts.service);

		const shouldResolve = strategy?.shouldResolveTextResponse?.(url, contentType, opts);
		if (!shouldResolve) return null;

		opts.onProgress?.({
			status: 'DOWNLOADING',
			message: `${shouldResolve ? 'TEXT RESPONSE IS NEEDED TO BE RESOLVED' : 'NO NEED TO RESOLVE TEXT RESPONSE'} FOR ${url} WITH CONTENT TYPE ${contentType}`
		});

		const directUrl = strategy?.getDirectVideoUrlFromText?.(await body.text(), opts);

		if (!directUrl || directUrl === url) throw new Error(`UNABLE TO RESOLVE DIRECT VIDEO URL FROM ${url}`);

		opts.onProgress?.({ status: 'DOWNLOADING', message: `\n[${opts.service}]\n DIRECT MP4 RESOLVED: ${directUrl}` });

		return this.requestStream(directUrl, opts);
	}

	public async requestStream(url: string, opts: DownloadOptions): Promise<HLSStreamRequest> {
		const { headers = {}, timeoutMs = 30_000, retries = 3 } = opts;
		const mergedHeaders = { ...this.Default_HEADERS, 'Referer': opts.referer, ...headers, 'X-Forwarded-For': this.makeIP() };

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const response = await fetch(url, {
					headers: { ...mergedHeaders, 'X-Forwarded-For': this.makeIP() } as Record<string, string>,
					redirect: 'follow',
					referrer: opts.referer
				});

				const finalUrl = response.url || url;
				const contentType = response.headers.get('content-type') || '';
				const responseHeaders = Object.fromEntries(response.headers.entries());

				if (response.status === 404) {
					opts.onProgress?.({ status: 'DOWNLOADING', message: `GOT A 404 STATUS FROM ${url}\n SWITCHING TO SERVICE AWARE 404` });

					const serviceResult = await this.handleServiceAware404(url, opts);
					if (serviceResult) return serviceResult;

					throw new NotFoundException(opts.service, url);
				}

				if (response.status === 429 || response.status >= 500) {
					await this.delay(attempt);
					continue;
				}

				const resolvedTextResponse = await this.resolveServiceTextResponse(url, contentType, response, opts);
				if (resolvedTextResponse) return resolvedTextResponse;

				if (this.hlsFetchService.isHlsManifest(contentType, finalUrl)) {
					opts?.onProgress?.({ status: 'DOWNLOADING', message: 'FOUND HLS MANIFEST, SWITCHING TO HLS STREAM' });
					/**
					 * References file with extensions .m3u or content-type containing 'mpegurl'
					 * For more reference check the HLSManifest.m3u file in the src/fetcher directory
					 */
					const manifest = await response.text();
					const type = detectHlsContainer(manifest);
					return {
						finalUrl,
						headers: { ...responseHeaders, 'x-hls-container': type },
						start: (stream: Writable, onProgress?: (event: JobProgressEvent) => void) =>
							this.hlsFetchService.fetchHlsStream(manifest, finalUrl, timeoutMs, stream, {
								...opts,
								onSegmentProgress: onProgress
							})
					};
				}

				return {
					finalUrl,
					headers: responseHeaders,
					start: async (stream: Writable, onProgress?: (event: JobProgressEvent) => void) => {
						await this.readAndShowProgress(stream, response, onProgress);
					}
				};
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				if (attempt < retries) {
					await this.delay(attempt);
					continue;
				}
			}
		}
		throw new DownloadException(url, opts.service, '', { cause: lastError ?? new Error('UNKNOWN ERROR') });
	}

	private async readAndShowProgress(stream: Writable, res: Response, onProgress?: (event: JobProgressEvent) => void): Promise<void> {
		const readable = Readable.fromWeb(res.body as any);

		const size = Number(res.headers.get('content-length') || 0);
		let downloaded = 0;
		let lastEmit = 0;

		readable.on('data', (chunk: Buffer) => {
			downloaded += chunk.length;

			const now = Date.now();
			if (now - lastEmit > 2000) {
				lastEmit = now;

				onProgress?.({
					status: 'DOWNLOADING',
					progress: size ? (downloaded / size) * 100 : 0,
					downloadedBytes: downloaded,
					totalBytes: size
				});
			}
		});

		await pipeline(readable, stream);

		onProgress?.({
			status: 'COMPLETED',
			progress: 100,
			downloadedBytes: downloaded,
			totalBytes: size
		});
	}
}
