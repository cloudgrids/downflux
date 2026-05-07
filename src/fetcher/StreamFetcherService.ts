import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Response as UResponse } from 'undici';
import { DownloadException, NotFoundException } from '../exceptions';
import { detectHlsContainer } from '../helpers';
import { ProgressService } from '../progress';
import { StrategyService } from '../strategies';
import { DownloadOptions, HLSStreamRequest } from '../util';
import { FetcherService } from './FetcherService';
import { HLSFetchService } from './HLSFetchService';

export class StreamFetcherService extends FetcherService {
	private readonly MAX_CDN_FALLBACK = 1;
	private readonly MAX_RE_EXTRACT = 1;
	private CDN_FALLBACK_COUNT = 0;
	private RE_EXTRACT_COUNT = 0;

	constructor(
		private readonly hlsFetchService: HLSFetchService,
		private readonly strategyService: StrategyService,
		progressService: ProgressService
	) {
		super(progressService);
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
		body: UResponse,
		opts: DownloadOptions
	): Promise<HLSStreamRequest | null> {
		const strategy = this.strategyService.getStrategy(opts.service);
		const shouldResolve = strategy?.shouldResolveTextResponse?.(url, contentType);
		if (!shouldResolve) return null;

		const directUrl = strategy?.getDirectVideoUrlFromText?.(await body.text(), opts);
		if (!directUrl || directUrl === url) throw new Error(`Unable to resolve direct video url from ${url}`);

		this.progressService.update({ message: 'Direct mp4 resolved', redirectedUrl: directUrl });
		return this.requestStream(directUrl, opts);
	}

	public async requestStream(url: string, opts: DownloadOptions): Promise<HLSStreamRequest> {
		const { timeoutMs = 30_000, retries = 3 } = opts;

		const strategy = this.strategyService.getStrategy(opts.service);
		const candidateUrls = strategy.getHostFallbackUrls?.(url) ?? [url];

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			const candidateUrl = candidateUrls[attempt % candidateUrls.length];

			const initialHeaders = this.randomHeaders({ Referer: opts.referer ?? candidateUrl, ...opts?.headers });
			const headers = this.applyCookieWithHeader(
				candidateUrl,
				this.addOriginWithHeader(initialHeaders, opts.referer ?? candidateUrl)
			);

			try {
				const response = await this.fetchWithTransportFallback(candidateUrl, {
					headers,
					redirect: 'follow',
					referrer: opts.referer
				});

				this.storeCookies(candidateUrl, response.headers);

				const finalUrl = response.url || candidateUrl;
				const contentType = response.headers.get('content-type') || '';
				const responseHeaders = Object.fromEntries(response.headers.entries());

				if (response.status === 404) {
					this.progressService.update({ message: `Statuscode 404: ${candidateUrl}` });

					const serviceResult = await this.handleServiceAware404(candidateUrl, opts);
					if (serviceResult) return serviceResult;

					throw new NotFoundException(opts.service, candidateUrl);
				}

				if (response.status === 429 || response.status >= 500) {
					await this.delay(attempt);
					continue;
				}

				const resolvedTextResponse = await this.resolveServiceTextResponse(candidateUrl, contentType, response, opts);
				if (resolvedTextResponse) return resolvedTextResponse;

				if (this.hlsFetchService.isHlsManifest(contentType, finalUrl)) {
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

		throw new DownloadException(url, opts.service, `Candidates: ${candidateUrls.join(', ')}`, {
			cause: lastError ?? new Error('Unknown error')
		});
	}

	private async readAndShowProgress(stream: Writable, res: UResponse): Promise<void> {
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
