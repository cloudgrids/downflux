import { HtmlClient } from '@app/clients';
import { DefaultExtractorResult, DownloadOptions, ExecutionArgs } from '@app/contracts';
import { ParserRegistry } from '@app/parsers';
import { ProgressManager } from '@app/progress';
import { ProviderType } from '@app/shared';

export class DefaultTransformer<TExec extends ExecutionArgs, TResult = DefaultExtractorResult> {
	constructor(
		protected readonly htmlClient: HtmlClient,
		protected readonly progressManager: ProgressManager
	) {}

	public async transform(url: string, request?: TExec): Promise<TResult> {
		const fetched = await this.htmlClient.fetchHtml(url, request as DownloadOptions);

		const base = ParserRegistry.getParser(ProviderType.Default).transform(fetched.html, fetched.finalUrl);

		if (request?.provider !== ProviderType.Default) {
			const transformed = ParserRegistry.getParser(request?.provider as ProviderType).transform(fetched.html, fetched.finalUrl);
			return { ...base, ...transformed, request } as TResult;
		}

		return base as TResult;
	}
}
