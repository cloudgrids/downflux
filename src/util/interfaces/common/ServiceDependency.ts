import { DownloaderService } from '../../../downloaders';
import { HttpFetcherService } from '../../../fetcher';
import { JobService } from '../../../job';
import { TransformerService } from '../../../transformers';

export interface ServiceDependencies {
	httpFetcherService: HttpFetcherService;
	transformerService: TransformerService;
	downloaderService: DownloaderService;
	jobService: JobService;
}
