import { BaseHttpClient } from '@base';
import { DownloadOptions, FetchResult } from '@contracts';
import { ProgressManager } from '@core/progress';
import { StrategyRegistry } from '@core/registries';
import { Provider } from '@types';

/**
 * HTTP engine for page and JSON metadata requests.
 *
 * @remarks
 * The client applies provider strategies, retry behavior, cookie persistence,
 * transport fallback, and response decoding before parsers receive HTML.
 */
export class HttpClient extends BaseHttpClient {
	constructor(progressManager: ProgressManager) {
		super(progressManager);
	}
	private readonly strategyRegistry = new StrategyRegistry(this.progressManager);

	/**
	 * Fetches a page as HTML using provider-aware transport rules.
	 *
	 * @param url Page URL to fetch.
	 * @param opts Download and HTTP options.
	 * @returns Decoded HTML, final URL, status, headers, and raw buffer.
	 */
	public async fetchHtml(url: string, opts: DownloadOptions): Promise<FetchResult> {
		const { retries = 3 } = opts;
		const timeoutMs = opts.timeoutMs ?? 30_000;
		const strategy = await this.strategyRegistry.getStrategy(opts.provider ?? Provider.Default);
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
				} = await this.fetchWithTransportFallback(
					candidateUrl,
					{
						headers,
						body: opts.formData ? new URLSearchParams(opts.formData).toString() : undefined,
						method: opts.formData ? 'POST' : 'GET',
						redirect: 'follow',
						signal: AbortSignal.timeout(timeoutMs)
					},
					opts
				);

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
