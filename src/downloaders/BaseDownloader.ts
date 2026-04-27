import { OutputType } from '../enums';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { DownloadResult } from '../types';
import { DownloadOptions } from './DownloaderService';

export class BaseDownloader {
	constructor(
		protected readonly fileService: FileService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	public async downloadFile<TExtendedMetadata = unknown>(url: string, opts: DownloadOptions): Promise<DownloadResult<TExtendedMetadata>> {
		const { outputType, dirConfig, service, ...fetchOpts } = opts;

		const { originalFilename, extension, extendedFilename } = this.fileService.getFilenameAndExtensionFromUrl(url, dirConfig?.prefix);
		const mimeType = this.fileService.resolveMimeFromExtension(extension);

		const buffer = await this.httpFetcherService.fetchBuffer(url, fetchOpts);
		const result: DownloadResult<TExtendedMetadata> = {
			service,
			url,
			originalFilename,
			extendedFilename,
			extension,
			mimeType,
			sizeBytes: buffer.byteLength
		};

		switch (outputType) {
			case OutputType.BUFFER:
				result.buffer = buffer;
				return result;

			case OutputType.DEVICE: {
				const localPath = await this.fileService.saveToDevice(buffer, dirConfig?.path as string, extendedFilename);
				result.localPath = localPath;

				return result;
			}
			default:
				throw new Error('Invalid output type');
		}
	}
}
