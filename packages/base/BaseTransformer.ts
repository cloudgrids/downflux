import { DefaultExecutionResult, DownloadOptions, ExecutionArgs, VideoSourceOutput } from '@contracts';
import { ProgressManager } from '@core/progress';
import { ParserRegistry } from '@core/registries';
import { HttpClient } from '@engine/http';
import { ProviderType, VideoQuality } from '@types';

interface UniqueVideosProps<T> {
	getUrl: (video: T) => string;
	getQuality: (video: T) => VideoQuality;
}

export class BaseTransformer<TExec extends ExecutionArgs, TResult = DefaultExecutionResult> {
	constructor(
		protected readonly httpClient: HttpClient,
		protected readonly progressManager: ProgressManager
	) {}

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

	public async requestData(url: string, opts: DownloadOptions) {
		return await this.httpClient.fetchJson(url, opts);
	}

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
