import { HttpFetcherService } from '../fetcher';
import { HtmlParserService } from '../parser';
import { ExecutionArguments, ServiceType } from '../util';
import { BaseTransformer } from './BaseTransformer';
import { DefaultTransformer } from './DefaultTransformer';
import { OkPornTransformer } from './OkPornTransformer';

export class TransformerService {
	private readonly transformers: Map<ServiceType, BaseTransformer<any>>;

	constructor(
		private readonly htmlParserService: HtmlParserService,
		private readonly httpFetcherService: HttpFetcherService
	) {
		this.transformers = new Map<ServiceType, BaseTransformer<any>>([
			[ServiceType.OKPORN, new OkPornTransformer(this.htmlParserService, this.httpFetcherService)],
			[ServiceType.DEFAULT, new DefaultTransformer(this.htmlParserService, this.httpFetcherService)]
		]);
	}

	public async transform<T>(url: string, request: ExecutionArguments): Promise<T> {
		const serviceType = request.service || ServiceType.DEFAULT;
		const transformer = this.transformers.get(serviceType) || this.transformers.get(ServiceType.DEFAULT);

		if (!transformer) throw new Error(`No transformer found for service: ${serviceType}`);

		return (await transformer.transform(url, request)) as T;
	}
}
