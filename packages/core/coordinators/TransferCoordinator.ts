import { DownloadOptions, DownloadResult, PipelineItem } from '@contracts';
import { ProgressManager } from '@core/progress';
import { StreamHttpClient } from '@engine/http';
import { FileManager } from '@storage';
import { OutputType } from '@types';
import { finished } from 'stream/promises';

/**
 * Coordinates one pipeline item transfer into storage.
 *
 * @remarks
 * The transfer coordinator binds streaming and storage together. It resolves
 * the final media URL, opens the correct sink, streams bytes, finalizes the
 * stored media, and returns download metadata to the task coordinator.
 */
export class TransferCoordinator {
	constructor(
		protected readonly fileManager: FileManager,
		protected readonly streamHttpClient: StreamHttpClient,
		protected readonly progressManager: ProgressManager
	) {}

	/**
	 * Downloads a single pipeline item.
	 *
	 * @param item Pipeline item describing the media URL and identifier.
	 * @param opts Download and output options.
	 * @returns Final download details including path, size, MIME type, and final URL.
	 */
	public async download(item: PipelineItem, opts: DownloadOptions): Promise<DownloadResult> {
		const { dirConfig, provider, outputType } = opts;
		const url = item.downloadUrl;

		const initialFile = this.fileManager.getFileInfo(url, dirConfig?.prefix);

		const { finalUrl, headers, start, isFmp4 } = await this.streamHttpClient.requestStream(url, {
			...opts,
			referer: item.sourceUrl,
			pipelineItem: item
		});

		const resolvedFile = this.fileManager.deriveResolvedFile(initialFile, finalUrl, headers, isFmp4, dirConfig?.prefix);

		this.progressManager.update({ message: `Extracting metadata for: ${resolvedFile.extendedFilename}` });

		const { stream, finalize } = this.fileManager.createSink({
			provider,
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
			provider
		};
	}
}
