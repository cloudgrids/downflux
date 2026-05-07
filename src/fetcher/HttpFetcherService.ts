import crypto from 'crypto';
import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Agent, Headers, fetch as UFetch } from 'undici';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';
import { DownloadException, NotFoundException } from '../exceptions';
import { detectHlsContainer } from '../helpers';
import { ProgressService } from '../progress';
import { StrategyService } from '../strategies';
import { DownloadOptions, FetchResult, HLSStreamRequest, HttpFetchOptions } from '../util';
import { HEADER_PRESETS } from '../util/constants';
import { HLSFetchService } from './HLSFetchService';

export class HttpFetcherService {
	private readonly MAX_CDN_FALLBACK = 1;
	private readonly MAX_RE_EXTRACT = 1;
	private CDN_FALLBACK_COUNT = 0;
	private RE_EXTRACT_COUNT = 0;
	private readonly CHROME_CIPHERS = [
		'TLS_AES_128_GCM_SHA256',
		'TLS_AES_256_GCM_SHA384',
		'TLS_CHACHA20_POLY1305_SHA256',
		'ECDHE-ECDSA-AES128-GCM-SHA256',
		'ECDHE-RSA-AES128-GCM-SHA256',
		'ECDHE-ECDSA-AES256-GCM-SHA384',
		'ECDHE-RSA-AES256-GCM-SHA384',
		'ECDHE-ECDSA-CHACHA20-POLY1305',
		'ECDHE-RSA-CHACHA20-POLY1305',
		'ECDHE-RSA-AES128-SHA',
		'ECDHE-RSA-AES256-SHA',
		'AES128-GCM-SHA256',
		'AES256-GCM-SHA384',
		'AES128-SHA',
		'AES256-SHA'
	].join(':');

	private readonly agent = new Agent({
		connect: {
			ciphers: this.CHROME_CIPHERS,
			honorCipherOrder: true,
			minVersion: 'TLSv1.2',
			maxVersion: 'TLSv1.3',
			ALPNProtocols: ['h2', 'http/1.1']
		}
	});

	constructor(
		private readonly hlsFetchService: HLSFetchService,
		private readonly progressService: ProgressService,
		private readonly strategyService: StrategyService
	) {}

	private get secureOptions() {
		return (
			crypto.constants.SSL_OP_NO_SSLv2 |
			crypto.constants.SSL_OP_NO_SSLv3 |
			crypto.constants.SSL_OP_NO_TLSv1 |
			crypto.constants.SSL_OP_NO_TLSv1_1
		);
	}

	private randomHeaders(extra: Record<string, string> = {}) {
		const preset = HEADER_PRESETS[Math.floor(Math.random() * HEADER_PRESETS.length)];

		return {
			...preset,
			...extra
		};
	}

	private async delay(attempt: number) {
		const base = 300; // ms
		const jitter = Math.random() * 200;
		const delay = base * 2 ** attempt + jitter;
		return new Promise((res) => setTimeout(res, delay));
	}

	private async readBody(body: ReadableStream<Uint8Array> | null): Promise<Buffer> {
		if (!body) return Buffer.alloc(0);

		const reader = body.getReader();
		const chunks: Buffer[] = [];

		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			chunks.push(Buffer.from(value));
		}

		return Buffer.concat(chunks);
	}

	private decodeBody(buffer: Buffer, headers: Headers): Buffer {
		const enc = headers['content-encoding'];

		if (!enc) return buffer;

		if (enc.includes('gzip')) return gunzipSync(buffer);
		if (enc.includes('deflate')) return inflateSync(buffer);
		if (enc.includes('br')) return brotliDecompressSync(buffer);

		return buffer;
	}

	private headers(headers: Headers): Record<string, string> {
		return Object.fromEntries(headers.entries());
	}

	private fetchOutput(finalUrl: string, status: number, headers: Headers, buffer: Buffer): FetchResult {
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
		const headers = this.randomHeaders({ Referer: opts?.referer ?? url, ...opts.headers });

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const {
					status: statusCode,
					headers: resHeaders,
					body
				} = await UFetch(url, {
					headers,
					redirect: 'follow',
					dispatcher: this.agent
				});

				if (statusCode === 404) return this.fetchOutput(url, statusCode, resHeaders, Buffer.alloc(0));

				if (statusCode === 429 || statusCode >= 500) {
					await this.delay(attempt);
					continue;
				}

				console.log({ resHeaders });

				const buffer = this.decodeBody(await this.readBody(body as ReadableStream<Uint8Array> | null), resHeaders);

				return this.fetchOutput(url, statusCode, resHeaders, buffer);
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				console.log({ lastError });

				if (attempt < retries) {
					await this.delay(attempt);
					continue;
				}
			}
		}
		throw new Error(`FAILED TO FETCH ${url} AFTER ${retries + 1} ATTEMPTS: ${lastError}`);
	}

	private async handleServiceAware404(url: string, opts: DownloadOptions): Promise<HLSStreamRequest | null> {
		const strategy = this.strategyService.getStrategy(opts.service);

		if (!strategy) return null;

		if (strategy.shouldFallback404?.(url) && this.CDN_FALLBACK_COUNT < this.MAX_CDN_FALLBACK) {
			const fallback = strategy.getFallbackUrl?.(url);

			if (fallback && fallback !== url) {
				this.progressService.update({ message: `CDN fallback: ${fallback}` });

				return this.requestStream(fallback, opts);
			}
		}

		if (strategy.shouldReExtract?.(url) && opts.reExtract && opts.pipelineItem && this.RE_EXTRACT_COUNT < this.MAX_RE_EXTRACT) {
			this.progressService.update({ message: `HLS expired, re extracting...` });

			const freshItem = await opts.reExtract(opts.pipelineItem);
			const freshUrl = freshItem?.downloadUrl;

			if (freshItem && freshUrl && freshUrl !== url) {
				return this.requestStream(freshUrl, {
					...opts,
					pipelineItem: freshItem,
					referer: freshItem.sourceUrl
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
		const strategy = this.strategyService.getStrategy(opts.service);

		const shouldResolve = strategy?.shouldResolveTextResponse?.(url, contentType);
		if (!shouldResolve) return null;

		this.progressService.update({ message: `${shouldResolve ? 'Resolved text response' : 'Discarded text response'}` });

		const directUrl = strategy?.getDirectVideoUrlFromText?.(await body.text(), opts);

		if (!directUrl || directUrl === url) throw new Error(`Unable to resolve direct video url from ${url}`);

		this.progressService.update({ message: 'Direct mp4 resolved', redirectedUrl: directUrl });

		return this.requestStream(directUrl, opts);
	}

	public async requestStream(url: string, opts: DownloadOptions): Promise<HLSStreamRequest> {
		const { timeoutMs = 30_000, retries = 3 } = opts;

		const headers = this.randomHeaders({ Referer: opts.referer ?? url, ...opts?.headers });
		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const response = await fetch(url, {
					headers,
					redirect: 'follow',
					referrer: opts.referer
				});

				const finalUrl = response.url || url;
				const contentType = response.headers.get('content-type') || '';
				const responseHeaders = Object.fromEntries(response.headers.entries());

				if (response.status === 404) {
					this.progressService.update({ message: `Statuscode 404: ${url}` });

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
					this.progressService.update({ message: 'Found HLS manifest switching to hls stream', hlsSegmentUrl: finalUrl });
					/**
					 * References file with extensions .m3u or content-type containing 'mpegurl'
					 * For more reference check the HLSManifest.m3u file in the src/fetcher directory
					 */
					const manifest = await response.text();
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
					start: async (stream: Writable) => {
						await this.readAndShowProgress(stream, response);
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
		throw new DownloadException(url, opts.service, '', { cause: lastError ?? new Error('Unknown error') });
	}

	private async readAndShowProgress(stream: Writable, res: Response): Promise<void> {
		const readable = Readable.fromWeb(res.body as any);

		const size = Number(res.headers.get('content-length') || 0);
		let downloaded = 0;
		let lastEmit = 0;

		readable.on('data', (chunk: Buffer) => {
			downloaded += chunk.length;

			const now = Date.now();
			if (now - lastEmit > 2000) {
				lastEmit = now;

				this.progressService.update({ downloadedBytes: downloaded, totalBytes: size });
			}
		});

		await pipeline(readable, stream);

		this.progressService.update({ status: 'COMPLETED', downloadedBytes: downloaded });
	}
}
