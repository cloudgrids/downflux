import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { DEFAULT_ALLOWED_EXTENSIONS } from '../helpers/extensions';
import { DownloadResult, FetchOptions, ImportExecutionOptions, OutputType } from '../types';

export interface DownloadOptions extends FetchOptions, ImportExecutionOptions {
	outputType: OutputType;
}

export class DownloaderService {
	constructor(
		private readonly httpFetcherService: HttpFetcherService,
		private readonly fileService: FileService
	) {}

	public async downloadFile(url: string, opts: DownloadOptions): Promise<DownloadResult> {
		const { outputType, device, ...fetchOpts } = opts;

		const { originalFilename, extension, extendedFilename } = this.fileService.getFilenameAndExtensionFromUrl(url, device?.prefix);
		const mimeType = this.fileService.resolveMimeFromExtension(extension);

		const buffer = await this.httpFetcherService.fetchBuffer(url, fetchOpts);
		const result: DownloadResult = {
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

			case OutputType.DEVICE:
				const localPath = await this.fileService.saveToDevice(buffer, device?.path as string, extendedFilename);
				result.localPath = localPath;

				return result;
			default:
				throw new Error('Invalid output type');
		}
	}

	public filterUrlsByExtension(urls: string[], allowed: string[] = DEFAULT_ALLOWED_EXTENSIONS): string[] {
		return [
			...new Set(
				urls.filter((url) => {
					const pathname = url.split('?')[0];
					const ext = `.${pathname.split('.').pop()?.toLowerCase()}`;
					return allowed.includes(ext);
				})
			)
		];
	}
}
