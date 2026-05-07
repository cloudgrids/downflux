import { ProgressService } from '../progress';
import { StrategyService } from '../strategies';
import { FetchResult, HttpFetchOptions, ServiceType } from '../util';
import { FetcherService } from './FetcherService';

export class HtmlFetcherService extends FetcherService {
	constructor(
		private readonly strategyService: StrategyService,
		progressService: ProgressService
	) {
		super(progressService);
	}

	public async fetchHtml(url: string, opts: HttpFetchOptions & { service?: ServiceType }): Promise<FetchResult> {
		const { retries = 3 } = opts;
		const timeoutMs = opts.timeoutMs ?? 30_000;
		const strategy = this.strategyService.getStrategy(opts.service ?? ServiceType.Default);
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
