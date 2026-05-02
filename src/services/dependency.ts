import { DownloaderService } from '../downloaders/DownloaderService';
import { HttpFetcherService } from '../fetcher';
import { FileService } from '../file';
import { BackgroundService, JobService } from '../job';
import { TransformerService } from '../transformers';
import { ServiceDependencies } from '../util';

/**
 * Creates the default service dependency graph.
 * @returns Default service dependencies
 */
export function createDefaultDependencies(): ServiceDependencies {
	const httpFetcherService = new HttpFetcherService();
	const fileService = new FileService();

	const transformerService = new TransformerService(httpFetcherService);
	const downloaderService = new DownloaderService(fileService, httpFetcherService);
	const backgroundService = new BackgroundService(downloaderService, fileService);
	const jobService = new JobService(transformerService, backgroundService, fileService, downloaderService);
	return {
		httpFetcherService,
		transformerService,
		downloaderService,
		jobService
	};
}
