import { OutputType, ServiceType } from '../enums';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { HttpFetchOptions } from '../types/HttpFetchOptions';
import { JobOptions } from '../types/JobOptions';
import { BaseDownloader } from './BaseDownloader';
import { DefaultDownloader } from './default/DefaultDownloader';
import { OkPornDownloader } from './okporn/OkPornDownloader';

export interface DownloadOptions extends HttpFetchOptions, JobOptions {
	outputType: OutputType;
	service?: ServiceType;
}

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

	public getDownloader(service?: ServiceType): BaseDownloader {
		return (service && this.downloaders[service]) || this.defaultDownloader;
	}
}
