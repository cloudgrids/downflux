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

		const { finalUrl, headers, start, isFmp4 } = await this.streamFetcherService.requestStream(url, {
			...opts,
			referer: item.sourceUrl,
			pipelineItem: item
		});

		const resolvedFile = this.resolveFileMetadata(initialFile, finalUrl, headers, isFmp4, dirConfig?.prefix);

		this.progressService.update({ message: `Extracting metadata for: ${resolvedFile.extendedFilename}` });

		const { stream, finalize } = this.fileService.createSink({
			service,
			type: outputType as OutputType,
			directoryPath: dirConfig?.directoryPath,
			filename: resolvedFile.originalFilename,
			identifier: item.identifier.key,
			noDownload: opts.noDownload,
			transCodeOptions: opts.transcodeOptions
		});

		try {
			await start(stream, opts.noDownload);

			if (!stream.destroyed && !stream.writableEnded) stream.end();
			await finished(stream);
		} catch (err) {
			stream.destroy(err instanceof Error ? err : new Error(String(err)));
			throw err;
		}

		const finalDetails = await finalize(resolvedFile, headers, isFmp4);

		return {
			...finalDetails,
			url,
			finalUrl,
			service
		};
	}

	private resolveFileMetadata(
		initial: ResolvedFile,
		finalUrl: string,
		headers: Record<string, string>,
		isFmp4?: boolean,
		prefix?: string
	): ResolvedFile {
		const isHls = finalUrl.includes('.m3u8') || headers['content-type']?.includes('application/vnd.apple.mpegurl');

		if (isHls) {
			// const container = headers['x-hls-container']; --- IGNORE ---

			const extension = isFmp4 ? 'mp4' : 'ts';

			const baseName = this.fileService
				.sanitizeFilename(initial.originalFilename.replace(/\.[^.]+$/, '') || 'video')
				.replace(/\./g, '_');

			return {
				originalFilename: `${baseName}.${extension}`,
				extension,
				extendedFilename: `${prefix ?? ''}${baseName}.${extension}`
			};
		} else if (initial.extension) return initial;

		const fallback = this.fileService.getFileInfo(finalUrl, prefix);
		if (fallback.extension) return fallback;

		return initial;
	}
}
