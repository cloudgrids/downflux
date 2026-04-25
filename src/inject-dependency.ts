import { DownloaderService } from './downloader/DownloaderService';
import { ExtractorService } from './extractor/ExtractorService';
import { HttpFetcherService } from './fetcher/HttpFetcherService';
import { FileService } from './file/FileService';
import { JobService } from './job/JobService';
import { HtmlParserService } from './parser/HtmlParserService';

export interface ImporterDependencies {
	htmlParser: HtmlParserService;
	httpFetcher: HttpFetcherService;
	extractor: ExtractorService;
	downloader: DownloaderService;
	job: JobService;
}
export function createDefaultDependencies(): ImporterDependencies {
	const htmlParser = new HtmlParserService();
	const httpFetcher = new HttpFetcherService();
	const fileService = new FileService();

	const extractor = new ExtractorService(htmlParser, httpFetcher);
	const downloader = new DownloaderService(httpFetcher, fileService);
	const job = new JobService(extractor, downloader, fileService);

	return {
		htmlParser,
		httpFetcher,
		extractor,
		downloader,
		job
	};
}
