import { DownloadOptions, FetchResult } from '@app/contracts';
import { ProgressManager } from '@app/progress';
import { ProviderType } from '@app/shared';
import { StrategyRegistry } from '@app/strategies';
import { BaseHttpClient } from './BaseHttpClient';

export class HtmlClient extends BaseHttpClient {
	constructor(progressManager: ProgressManager) {
		super(progressManager);
	}
	private readonly strategyRegistry = new StrategyRegistry(this.progressManager);

	public async fetchHtml(url: string, opts: DownloadOptions): Promise<FetchResult> {
		const { retries = 3 } = opts;
		const timeoutMs = opts.timeoutMs ?? 30_000;
		const strategy = this.strategyRegistry.getStrategy(opts.provider ?? ProviderType.Default);
		const candidateUrls = strategy.getHostFallbackUrls?.(url) ?? [url];

		let lastError: Error | null = null;

		for (let attempt = 0; attempt <= retries; attempt++) {
			const candidateUrl = candidateUrls[attempt % candidateUrls.length];

			const initialHeaders = this.randomHeaders({ Referer: opts?.referer ?? candidateUrl, ...opts.headers });
			const headers = this.applyCookieWithHeader(
				candidateUrl,
				this.addOriginWithHeader(initialHeaders, opts?.referer ?? candidateUrl)
			);

			try {
				const {
					status: statusCode,
					headers: resHeaders,
					body
				} = await this.fetchWithTransportFallback(candidateUrl, {
					headers,
					redirect: 'follow',
					signal: AbortSignal.timeout(timeoutMs)
				});

				this.storeCookies(candidateUrl, resHeaders);

				const buffer = this.decodeBody(await this.readBody(body as ReadableStream<Uint8Array> | null), resHeaders);

				return {
					html: buffer.toString('utf8'),
					buffer,
					finalUrl: candidateUrl,
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

		throw new Error(`FAILED TO FETCH ${url} AFTER ${retries + 1} ATTEMPTS (CANDIDATES: ${candidateUrls.join(', ')}): ${lastError}`);
	}
}
