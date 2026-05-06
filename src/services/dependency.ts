import { DownloaderService } from '../downloader';
import { HLSFetchService, HttpFetcherService } from '../fetcher';
import { FfmpegService, FileService } from '../file';
import { BackgroundService, JobService } from '../job';
import { PipelineService } from '../pipelines';
import { ProgressService } from '../progress/ProgressService';
import { StrategyService } from '../strategies';
import { TransformerService } from '../transformers';
import { ServiceDependencies } from '../util';

/**
 * Creates the default service dependency graph.
 * @returns Default service dependencies
 */
export function createDefaultDependencies(): ServiceDependencies {
	const progressService = new ProgressService();

	const hlsFetchService = new HLSFetchService(progressService);

	const ffmpegService = new FfmpegService(progressService);
	const fileService = new FileService(ffmpegService, progressService);
	const strategyService = new StrategyService(progressService, fileService);
	const pipelineService = new PipelineService(fileService);
	const httpFetcherService = new HttpFetcherService(hlsFetchService, progressService, strategyService);

	const transformerService = new TransformerService(httpFetcherService, progressService);
	const downloaderService = new DownloaderService(fileService, httpFetcherService, progressService);
	const backgroundService = new BackgroundService(downloaderService, fileService, transformerService, progressService, pipelineService);
	const jobService = new JobService(transformerService, backgroundService, progressService, pipelineService);
	return {
		httpFetcherService,
		transformerService,
		downloaderService,
		strategyService,
		jobService,
		progressService
	};
}
