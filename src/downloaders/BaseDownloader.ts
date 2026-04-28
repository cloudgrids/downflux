import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { DownloadResult, PipelineItem } from '../types';
import { DownloadOptions } from './DownloaderService';

export abstract class BaseDownloader {
	constructor(
		protected readonly fileService: FileService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	public async download(item: PipelineItem, opts: DownloadOptions): Promise<DownloadResult> {
		const { dirConfig, service, ...fetchOpts } = opts;
		const url = item.downloadUrl;

		if (!url) throw new Error('Cannot download pipeline item without a downloadUrl');

		const { originalFilename, extension, extendedFilename } = this.fileService.getFilenameAndExtensionFromUrl(url, dirConfig?.prefix);
		const mimeType = this.fileService.resolveMimeFromExtension(extension);

		const buffer = await this.httpFetcherService.fetchBuffer(url, fetchOpts);
		const result: DownloadResult = {
			service,
			url,
			buffer,
			originalFilename,
			extendedFilename,
			extension,
			mimeType,
			sizeBytes: buffer.byteLength
		};

		return result;
	}
}
