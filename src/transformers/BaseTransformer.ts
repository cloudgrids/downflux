import { HttpFetcherService } from '../fetcher';
import { HtmlParserService } from '../parsers';
import { DefaultExtractorResult, ExecutionArgs, HttpFetchOptions, ServiceType } from '../util';

export class BaseTransformer<TExec extends ExecutionArgs, TResult = DefaultExtractorResult> {
	constructor(protected readonly httpFetcherService: HttpFetcherService) {}

	public async transform(url: string, request?: TExec): Promise<TResult> {
		const fetched = await this.httpFetcherService.fetchHtml(url, request as HttpFetchOptions);

		const base = HtmlParserService.getParser(ServiceType.DEFAULT).transform(fetched.html, fetched.finalUrl);

		if (request?.service !== ServiceType.DEFAULT) {
			const transformed = HtmlParserService.getParser(request?.service as ServiceType).transform(fetched.html, fetched.finalUrl);
			return { ...base, ...transformed } as TResult;
		}

		return base as TResult;
	}

	protected emitExtractProgress(request: TExec | undefined, status: 'extracting' | 'extracted', target: string): void {
		request?.onExtractProgress?.({
			status,
			target,
			countTarget: status === 'extracting'
		});
	}
}
