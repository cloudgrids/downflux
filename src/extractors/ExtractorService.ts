import { ServiceType } from '../enums';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { HtmlParserService } from '../parser/HtmlParserService';
import { BaseExtractor } from './BaseExtractor';
import { DefaultExtractor } from './DefaultExtractor';
import { OkPornExtractor } from './OkPornExtractor';

export class ExtractorService {
	private readonly defaultExtractor: BaseExtractor<any>;
	private readonly extractors: Partial<Record<ServiceType, BaseExtractor<any>>>;

	constructor(
		private readonly htmlParserService: HtmlParserService,
		private readonly httpFetcherService: HttpFetcherService
	) {
		this.defaultExtractor = new DefaultExtractor(this.htmlParserService, this.httpFetcherService);
		this.extractors = {
			[ServiceType.DEFAULT]: this.defaultExtractor,
			[ServiceType.OKPORN]: new OkPornExtractor(this.htmlParserService, this.httpFetcherService)
		};
	}

	public getExtractor(service?: ServiceType): BaseExtractor<any> {
		return (service && this.extractors[service]) || this.defaultExtractor;
	}
}
