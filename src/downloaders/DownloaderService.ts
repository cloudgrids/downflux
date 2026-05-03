import { finished } from 'stream/promises';
import { HttpFetcherService } from '../fetcher';
import { FileService } from '../file';
import { DownloadOptions, DownloadResult, OutputType, PipelineItem, ResolvedFile } from '../util';

export class DownloaderService {
	constructor(
		protected readonly fileService: FileService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	public async download(item: PipelineItem, opts: DownloadOptions): Promise<DownloadResult> {
		const { dirConfig, service, outputType } = opts;
		const url = item.downloadUrl;

		const initialFile = this.fileService.getFileInfo(url, dirConfig?.prefix);

		const { finalUrl, headers, start } = await this.httpFetcherService.requestStream(url, { ...opts, referer: item.sourceUrl });

		const resolvedFile = this.resolveFileMetadata(initialFile, finalUrl, headers, dirConfig?.prefix);

		const { stream, finalize } = this.fileService.createSink(service, outputType as OutputType, {
			directoryPath: dirConfig?.directoryPath,
			filename: resolvedFile.originalFilename,
			identifier: item.identifier.key
		});

		await start(stream);

		if (!stream.writableEnded) stream.end();
		await finished(stream);

		const finalDetails = await finalize(resolvedFile, headers);

		return {
			...finalDetails,
			url,
			finalUrl,
			service
		};
	}

	private resolveFileMetadata(initial: ResolvedFile, finalUrl: string, headers: Record<string, string>, prefix?: string): ResolvedFile {
		const isHls = finalUrl.includes('.m3u8') || headers['content-type']?.includes('mpegurl');

		if (isHls) {
			const baseName = this.fileService.sanitizeFilename(initial.originalFilename.replace(/\.[^.]+$/, '') || 'video');
			return {
				originalFilename: `${baseName}.ts`,
				extension: 'ts',
				extendedFilename: `${prefix ? prefix : ''}${baseName}.ts`
			};
		}

		if (initial.extension) return initial;

		const fallback = this.fileService.getFileInfo(finalUrl, prefix);
		if (fallback.extension) return fallback;

		return initial;
	}
}
