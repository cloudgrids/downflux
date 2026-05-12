import { DefaultExecutionResult, DownloadOptions, ExecutionArgs } from '@contracts';
import { ProgressManager } from '@core/progress';
import { ParserRegistry } from '@core/registries';
import { HttpClient } from '@engine/http';
import { ProviderType } from '@types';

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
}
