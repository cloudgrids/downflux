import { finished } from 'stream/promises';
import { OutputType } from '../enums';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { FileService } from '../file/FileService';
import { DownloadResult, PipelineItem } from '../types';
import { ResolvedFile } from '../types/ResolvedFile';
import { DownloadOptions } from './DownloaderService';

export abstract class BaseDownloader {
	constructor(
		protected readonly fileService: FileService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	public async download(item: PipelineItem, opts: DownloadOptions): Promise<DownloadResult> {
		const { dirConfig, service, outputType } = opts;
		const url = item.downloadUrl;

		const initialFile = this.fileService.getFileInfo(url, dirConfig?.prefix);

		const { finalUrl, headers, start } = await this.httpFetcherService.requestStream(url, opts);

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
			const baseName = initial.originalFilename.replace(/\.[^.]+$/, '') || 'video';
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
