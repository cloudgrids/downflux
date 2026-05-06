import { DownloaderService } from '../../../downloader';
import { HttpFetcherService } from '../../../fetcher';
import { JobService } from '../../../job';
import { ProgressService } from '../../../progress/ProgressService';
import { StrategyService } from '../../../strategies';
import { TransformerService } from '../../../transformers';

export interface ServiceDependencies {
	httpFetcherService: HttpFetcherService;
	transformerService: TransformerService;
	downloaderService: DownloaderService;
	jobService: JobService;
	strategyService: StrategyService;
	progressService: ProgressService;
}
