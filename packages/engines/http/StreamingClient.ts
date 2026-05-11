import { DownloadOptions, HLSStreamRequest, PipelineItem } from '@contracts';
import { DownloadException, NotFoundException } from '@core/exceptions';
import { ProgressManager } from '@core/progress';
import { StrategyRegistry } from '@core/registries';
import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Response as UResponse } from 'undici';
import { BaseHttpClient } from './BaseHttpClient';
import { HlsClient } from './HlsClient';

export class StreamHttpClient extends BaseHttpClient {
	private readonly MAX_CDN_FALLBACK = 1;
	private readonly MAX_RE_EXTRACT = 1;
	private CDN_FALLBACK_COUNT = 0;
	private RE_EXTRACT_COUNT = 0;

	constructor(
		private readonly hlsClient: HlsClient,
		private readonly strategyRegistry: StrategyRegistry,
		progressManager: ProgressManager
	) {
		super(progressManager);
	}

	private async handleServiceAware404(url: string, opts: DownloadOptions): Promise<HLSStreamRequest | null> {
		const strategy = await this.strategyRegistry.getStrategy(opts.provider);

		if (!strategy) return null;

		const shouldFallback = strategy.shouldFallback404?.(url) && this.CDN_FALLBACK_COUNT < this.MAX_CDN_FALLBACK;

		if (shouldFallback) {
			const fallback = strategy.getFallbackUrl?.(url);

			if (fallback && fallback !== url) {
				this.progressManager.update({ message: `CDN fallback: ${fallback}` });
				return this.requestStream(fallback, opts);
			}
		}

		const shouldReExtract =
			strategy.shouldReExtract?.(url) && opts.reExtract && opts.pipelineItem && this.RE_EXTRACT_COUNT < this.MAX_RE_EXTRACT;

		if (shouldReExtract) {
			this.progressManager.update({ message: `HLS expired, re extracting...` });

			const freshItem = await opts.reExtract?.(opts?.pipelineItem as PipelineItem);
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
		const strategy = await this.strategyRegistry.getStrategy(opts.provider);
		const shouldResolve = strategy?.shouldResolveTextResponse?.(url, contentType);

		this.progressManager.update({ message: `Resolving text response...${url} should resolve ${shouldResolve}` });

		if (!shouldResolve) return null;

		const directUrl = strategy?.getDirectVideoUrlFromText?.(await body.text(), opts);
		if (!directUrl || directUrl === url) throw new Error(`Unable to resolve direct video url from ${url}`);

		this.progressManager.update({ message: 'Direct mp4 resolved', redirectedUrl: directUrl });
		return this.requestStream(directUrl, opts);
	}

	public async requestStream(url: string, opts: DownloadOptions): Promise<HLSStreamRequest> {
		const { timeoutMs = 30_000, retries = 3 } = opts;

		const strategy = await this.strategyRegistry.getStrategy(opts.provider);
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
					this.progressManager.update({ message: `Statuscode 404: ${candidateUrl}` });

					const serviceResult = await this.handleServiceAware404(candidateUrl, opts);
					if (serviceResult) return serviceResult;

					throw new NotFoundException(opts.provider, candidateUrl);
				}

				if (response.status === 429 || response.status >= 500) {
					await this.delay(attempt);
					continue;
				}

				const resolvedTextResponse = await this.resolveServiceTextResponse(candidateUrl, contentType, response, opts);
				if (resolvedTextResponse) return resolvedTextResponse;

				if (this.hlsClient.isHlsManifest(contentType, finalUrl)) {
					const manifest = await response.text();

					return {
						finalUrl,
						isFmp4: await this.hlsClient.isFmp4(manifest, finalUrl, opts),
						headers: responseHeaders,
						start: (stream: Writable, noDownload?: boolean) =>
							this.hlsClient.fetchHlsStream(manifest, finalUrl, timeoutMs, stream, { ...opts, noDownload })
					};
				}

				return {
					finalUrl,
					headers: responseHeaders,
					start: async (stream: Writable, noDownload?: boolean) => {
						if (noDownload) {
							this.progressManager.update({ message: `Stream debug mode - skipping download for ${finalUrl}` });
							return;
						}

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

		throw new DownloadException(url, opts.provider, `Candidates: ${candidateUrls.join(', ')}`, {
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

				this.progressManager.update({ downloadedBytes: downloaded, totalBytes: size });
			}
		});

		await pipeline(readable, stream);

		this.progressManager.update({ status: 'COMPLETED', downloadedBytes: downloaded });
	}
}
