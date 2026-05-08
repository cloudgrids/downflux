import { HtmlFetcherService } from '../fetcher';
import { HtmlParserService } from '../parsers';
import { ProgressService } from '../progress/ProgressService';
import { DefaultExtractorResult, DownloadOptions, ExecutionArgs, ServiceType } from '../util';

export class BaseTransformer<TExec extends ExecutionArgs, TResult = DefaultExtractorResult> {
	constructor(
		protected readonly htmlFetcherService: HtmlFetcherService,
		protected readonly progressService: ProgressService
	) {}

	public async transform(url: string, request?: TExec): Promise<TResult> {
		const fetched = await this.htmlFetcherService.fetchHtml(url, request as DownloadOptions);

		const base = HtmlParserService.getParser(ServiceType.Default).transform(fetched.html, fetched.finalUrl);

		if (request?.service !== ServiceType.Default) {
			const transformed = HtmlParserService.getParser(request?.service as ServiceType).transform(fetched.html, fetched.finalUrl);
			return { ...base, ...transformed, request } as TResult;
		}

		return base as TResult;
	}
}
