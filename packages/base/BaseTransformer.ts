import { DefaultExecutionResult, DownloadOptions, ExecutionArgs, VideoSourceOutput } from '@contracts';
import { ProgressManager } from '@core/progress';
import { ParserRegistry } from '@core/registries';
import { HttpClient } from '@engine/http';
import { ProviderType, VideoQuality } from '@types';

/**
 * Selectors used to normalize provider-specific video records.
 *
 * @typeParam T Provider-specific video source record type.
 */
export interface UniqueVideosProps<T> {
	getUrl: (video: T) => string;
	getQuality: (video: T) => VideoQuality;
}

/**
 * Fetches a target URL and converts parser output into execution metadata.
 *
 * @remarks
 * Transformers sit between HTTP fetching and pipeline building. They combine
 * common parser output with provider-specific parser output, then provider
 * subclasses can map those raw fields into stable public result types.
 */
export class BaseTransformer<TExec extends ExecutionArgs, TResult = DefaultExecutionResult> {
	constructor(
		protected readonly httpClient: HttpClient,
		protected readonly progressManager: ProgressManager
	) {}

	/**
	 * Fetches HTML and merges default metadata with provider-specific metadata.
	 *
	 * @param url Target page to fetch.
	 * @param request Execution request that identifies the provider and options.
	 * @returns Parsed metadata ready for provider-specific output mapping.
	 */
	public async transform(url: string, request?: TExec): Promise<TResult> {
		const fetched = await this.httpClient.fetchHtml(url, request as DownloadOptions);

		const base = (await ParserRegistry.getParser(ProviderType.Default)).transform(fetched.html, fetched.finalUrl);

		if (request?.provider !== ProviderType.Default) {
			const transformed = (await ParserRegistry.getParser(request?.provider as ProviderType)).transform(
				fetched.html,
				fetched.finalUrl
			);
			return { ...base, ...transformed, request } as TResult;
		}

		return base as TResult;
	}

	/**
	 * Fetches JSON data for providers that expose API-backed metadata.
	 *
	 * @param url API endpoint to request.
	 * @param opts HTTP and provider options.
	 * @returns Parsed JSON response.
	 */
	public async requestData(url: string, opts: DownloadOptions) {
		return await this.httpClient.fetchJson(url, opts);
	}

	/**
	 * Removes duplicate video URLs while preserving quality information.
	 *
	 * @param videos Provider-specific video source records.
	 * @param options URL and quality selectors.
	 * @returns Unique video sources in the shared shape.
	 */
	protected uniqueVideos<T>(videos: T[], { getUrl, getQuality }: UniqueVideosProps<T>): VideoSourceOutput[] {
		const uniqueMap = new Map<string, VideoSourceOutput>();

		if (!videos || videos?.length === 0) return [];

		for (const video of videos) {
			const source = getUrl(video);
			if (!source) continue;

			if (!uniqueMap.has(source)) {
				uniqueMap.set(source, { url: source, quality: getQuality(video) });
			}
		}

		return Array.from(uniqueMap.values());
	}

	protected unique<T>(arr: T[]): T[] {
		if (!arr || arr?.length === 0) return [];
		return [...new Set(arr)];
	}
}
