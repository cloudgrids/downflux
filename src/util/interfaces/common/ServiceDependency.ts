import { DownloaderService } from '../../../downloader';
import { HtmlFetcherService, StreamFetcherService } from '../../../fetcher';
import { JobService } from '../../../job';
import { ProgressService } from '../../../progress/ProgressService';
import { CliRenderer } from '../../../renderer/CliRenderer';
import { StrategyService } from '../../../strategies';
import { TransformerService } from '../../../transformers';

export interface ServiceDependencies {
	htmlFetcherService: HtmlFetcherService;
	streamFetcherService: StreamFetcherService;
	transformerService: TransformerService;
	downloaderService: DownloaderService;
	jobService: JobService;
	strategyService: StrategyService;
	progressService: ProgressService;
	cliRenderer: CliRenderer;
}
