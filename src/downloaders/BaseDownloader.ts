import { OutputType } from '../enums';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { DownloadResult, PipelineItem } from '../types';
import { DownloadOptions } from './DownloaderService';

export abstract class BaseDownloader {
	constructor(
		protected readonly fileService: FileService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	public async downloadFile<TExtractedMetadata = unknown, TDownloadMetadata = unknown>(
		item: PipelineItem<TExtractedMetadata, TDownloadMetadata>,
		opts: DownloadOptions
	): Promise<PipelineItem<TExtractedMetadata, TDownloadMetadata>> {
		const { outputType, dirConfig, service, ...fetchOpts } = opts;
		const url = item.selectedUrl;

		if (!url) {
			throw new Error('Cannot download pipeline item without a selectedUrl');
		}

		const { originalFilename, extension, extendedFilename } = this.fileService.getFilenameAndExtensionFromUrl(url, dirConfig?.prefix);
		const mimeType = this.fileService.resolveMimeFromExtension(extension);

		const buffer = await this.httpFetcherService.fetchBuffer(url, fetchOpts);
		const result: DownloadResult<TDownloadMetadata> = {
			service,
			url,
			resourceType: item.resourceType,
			identifiers: item.identifiers,
			originalFilename,
			extendedFilename,
			extension,
			mimeType,
			sizeBytes: buffer.byteLength
		};

		switch (outputType) {
			case OutputType.BUFFER:
				result.buffer = buffer;
				item.download = result;
				return item;

			case OutputType.DEVICE: {
				const localPath = await this.fileService.saveToDevice(buffer, dirConfig?.path as string, extendedFilename);
				result.localPath = localPath;
				item.download = result;

				return item;
			}
			default:
				throw new Error('Invalid output type');
		}
	}
}
