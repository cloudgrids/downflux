import { HttpFetcherService } from '../fetcher';
import { HtmlParserService } from '../parsers';
import { ProgressService } from '../progress/ProgressService';
import { DefaultExtractorResult, ExecutionArgs, HttpFetchOptions, ServiceType } from '../util';

export class BaseTransformer<TExec extends ExecutionArgs, TResult = DefaultExtractorResult> {
	constructor(
		protected readonly httpFetcherService: HttpFetcherService,
		protected readonly progressService: ProgressService
	) {}

	public async transform(url: string, request?: TExec): Promise<TResult> {
		const fetched = await this.httpFetcherService.fetchHtml(url, request as HttpFetchOptions);

		const base = HtmlParserService.getParser(ServiceType.Default).transform(fetched.html, fetched.finalUrl);

		if (request?.service !== ServiceType.Default) {
			const transformed = HtmlParserService.getParser(request?.service as ServiceType).transform(fetched.html, fetched.finalUrl);
			return { ...base, ...transformed, request } as TResult;
		}

		return base as TResult;
	}
}
