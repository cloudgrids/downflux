import { MIME_TYPE } from '../common/MimeType';
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
		const { dirConfig, service } = opts;
		const url = item.downloadUrl;

		if (!url) throw new Error('Cannot download pipeline item without a downloadUrl');

		const initialFile = this.fileService.getFilenameAndExtensionFromUrl(url, dirConfig?.prefix);
		const { buffer, finalUrl, headers } = await this.httpFetcherService.fetchBuffer(url, opts);
		const resolvedFile = this.resolveFileMetadata(initialFile, finalUrl, headers, dirConfig?.prefix);
		const mimeType = MIME_TYPE[resolvedFile.extension] ?? this.mimeTypeFromHeaders(headers) ?? 'application/octet-stream';
		const result: DownloadResult = {
			service,
			url,
			buffer,
			finalUrl,
			originalFilename: resolvedFile.originalFilename,
			extendedFilename: resolvedFile.extendedFilename,
			extension: resolvedFile.extension,
			mimeType,
			sizeBytes: buffer.byteLength
		};

		return result;
	}

	private resolveFileMetadata(
		initial: { originalFilename: string; extension: string; extendedFilename: string },
		finalUrl: string,
		headers: Record<string, string>,
		prefix?: string
	): { originalFilename: string; extension: string; extendedFilename: string } {
		const contentType = headers['content-type']?.toLowerCase() ?? '';

		if (contentType.includes('video/mp2t')) {
			const baseName = initial.originalFilename.replace(/\.[^.]+$/, '') || 'video';
			return {
				originalFilename: `${baseName}.ts`,
				extension: 'ts',
				extendedFilename: `${prefix ? prefix : ''}${baseName}.ts`
			};
		}

		if (initial.extension) return initial;

		const fallback = this.fileService.getFilenameAndExtensionFromUrl(finalUrl, prefix);
		if (fallback.extension) return fallback;

		return initial;
	}

	private mimeTypeFromHeaders(headers: Record<string, string>): string | undefined {
		return headers['content-type']?.split(';')[0]?.trim();
	}
}
