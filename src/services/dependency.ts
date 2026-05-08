import { DownloaderService } from '../downloader';
import { HLSFetchService, HtmlFetcherService, StreamFetcherService } from '../fetcher';
import { FfmpegService, FileService } from '../file';
import { BackgroundService, JobService } from '../job';
import { PipelineService } from '../pipelines';
import { ProgressService } from '../progress';
import { CliRenderer } from '../renderer';
import { StrategyService } from '../strategies';
import { TransformerService } from '../transformers';
import { ServiceDependencies } from '../util';

/**
 * Creates the default service dependency graph.
 * @returns Default service dependencies
 */
export function createDefaultDependencies(): ServiceDependencies {
	const progressService = new ProgressService();

	const cliRenderer = new CliRenderer(progressService);

	const ffmpegService = new FfmpegService(progressService);
	const fileService = new FileService(ffmpegService, progressService);

	const strategyService = new StrategyService(progressService);

	const htmlFetcherService = new HtmlFetcherService(progressService);
	const hlsFetchService = new HLSFetchService(progressService);
	const streamFetcherService = new StreamFetcherService(hlsFetchService, strategyService, progressService);

	const pipelineService = new PipelineService(fileService);

	const transformerService = new TransformerService(htmlFetcherService, progressService);

	const downloaderService = new DownloaderService(fileService, streamFetcherService, progressService);

	const backgroundService = new BackgroundService(downloaderService, fileService, transformerService, progressService, pipelineService);
	const jobService = new JobService(transformerService, backgroundService, progressService, pipelineService);

	return {
		htmlFetcherService,
		streamFetcherService,
		transformerService,
		downloaderService,
		strategyService,
		jobService,
		progressService,
		cliRenderer
	};
}
