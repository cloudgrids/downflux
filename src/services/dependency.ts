import { DownloaderService } from '../downloaders/DownloaderService';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { BackgroundService } from '../job/BackgroundProcess';
import { JobService } from '../job/JobService';
import { HtmlParserService } from '../parser/HtmlParserService';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers/Transformer';
import { ServiceDependencies } from '../util';

export function createDefaultDependencies(): ServiceDependencies {
	const htmlParserService = new HtmlParserService();
	const httpFetcherService = new HttpFetcherService();
	const fileService = new FileService();
	const pipelineService = new PipelineService();

	const transformerService = new TransformerService(htmlParserService, httpFetcherService);
	const downloaderService = new DownloaderService(httpFetcherService, fileService);
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
