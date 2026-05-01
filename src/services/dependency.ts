import { DownloaderService } from '../downloaders/DownloaderService';
import { HttpFetcherService } from '../fetcher';
import { FileService } from '../file';
import { BackgroundService, JobService } from '../job';
import { HtmlParserService } from '../parser';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers';
import { ServiceDependencies } from '../util';

export function createDefaultDependencies(): ServiceDependencies {
	const htmlParserService = new HtmlParserService();
	const httpFetcherService = new HttpFetcherService();
	const fileService = new FileService();
	const pipelineService = new PipelineService();

	const transformerService = new TransformerService(htmlParserService, httpFetcherService);
	const downloaderService = new DownloaderService(fileService, httpFetcherService);
	const backgroundService = new BackgroundService(downloaderService, fileService);
	const jobService = new JobService(transformerService, pipelineService, backgroundService, fileService, downloaderService);
	return {
		htmlParserService,
		httpFetcherService,
		transformerService,
		downloaderService,
		jobService
	};
}
