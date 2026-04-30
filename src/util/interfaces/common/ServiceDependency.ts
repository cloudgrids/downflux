import { DownloaderService } from '../../../downloaders';
import { HttpFetcherService } from '../../../fetcher';
import { JobService } from '../../../job';
import { HtmlParserService } from '../../../parser';
import { TransformerService } from '../../../transformers';

export interface ServiceDependencies {
	htmlParserService: HtmlParserService;
	httpFetcherService: HttpFetcherService;
	transformerService: TransformerService;
	downloaderService: DownloaderService;
	jobService: JobService;
}
