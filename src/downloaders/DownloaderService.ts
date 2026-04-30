import { HttpFetcherService } from '../fetcher';
import { FileService } from '../file';
import { DownloadOptions, PipelineItem, ServiceType } from '../util';
import { BaseDownloader } from './BaseDownloader';
import { DefaultDownloader } from './DefaultDownloader';
import { OkPornDownloader } from './OkPornDownloader';

export class DownloaderService {
	private readonly defaultDownloader: BaseDownloader;
	private readonly downloaders: Partial<Record<ServiceType, BaseDownloader>>;

	constructor(
		private readonly httpFetcherService: HttpFetcherService,
		private readonly fileService: FileService
	) {
		this.defaultDownloader = new DefaultDownloader(this.fileService, this.httpFetcherService);
		this.downloaders = {
			[ServiceType.DEFAULT]: this.defaultDownloader,
			[ServiceType.OKPORN]: new OkPornDownloader(this.fileService, this.httpFetcherService)
		};
	}

	public async download(item: PipelineItem, opts: DownloadOptions) {
		const downloader = this.downloaders[opts.service] || this.defaultDownloader;
		return await downloader.download(item, opts);
	}
}
