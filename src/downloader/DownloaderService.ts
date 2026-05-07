import { finished } from 'stream/promises';
import { StreamFetcherService } from '../fetcher';
import { FileService } from '../file';
import { ProgressService } from '../progress';
import { DownloadOptions, DownloadResult, OutputType, PipelineItem, ResolvedFile } from '../util';

export class DownloaderService {
	constructor(
		protected readonly fileService: FileService,
		protected readonly streamFetcherService: StreamFetcherService,
		protected readonly progressService: ProgressService
	) {}

	public async download(item: PipelineItem, opts: DownloadOptions): Promise<DownloadResult> {
		const { dirConfig, service, outputType } = opts;
		const url = item.downloadUrl;

		const initialFile = this.fileService.getFileInfo(url, dirConfig?.prefix);

		const { finalUrl, headers, start } = await this.streamFetcherService.requestStream(url, {
			...opts,
			referer: item.sourceUrl,
			pipelineItem: item
		});

		const resolvedFile = this.resolveFileMetadata(initialFile, finalUrl, headers, dirConfig?.prefix);

		const { stream, finalize } = this.fileService.createSink({
			service,
			type: outputType as OutputType,
			directoryPath: dirConfig?.directoryPath,
			filename: resolvedFile.originalFilename,
			identifier: item.identifier.key
		});

		try {
			await start(stream);

			if (!stream.destroyed && !stream.writableEnded) stream.end();
			await finished(stream);
		} catch (err) {
			stream.destroy(err instanceof Error ? err : new Error(String(err)));
			throw err;
		}

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
			const container = headers['x-hls-container'];

			const extension = container === 'fmp4' ? 'mp4' : 'ts';

			const baseName = this.fileService.sanitizeFilename(initial.originalFilename.replace(/\.[^.]+$/, '') || 'video');

			return {
				originalFilename: `${baseName}.${extension}`,
				extension,
				extendedFilename: `${prefix ?? ''}${baseName}.${extension}`
			};
		}

		if (initial.extension) return initial;

		const fallback = this.fileService.getFileInfo(finalUrl, prefix);
		if (fallback.extension) return fallback;

		return initial;
	}
}
