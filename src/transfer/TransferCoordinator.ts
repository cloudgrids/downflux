import { finished } from 'stream/promises';
import { StreamHttpClient } from '@app/clients';
import { DownloadOptions, DownloadResult, PipelineItem } from '@app/contracts';
import { ProgressManager } from '@app/progress';
import { OutputType } from '@app/shared';
import { FileManager } from '@app/storage';

export class TransferCoordinator {
	constructor(
		protected readonly fileManager: FileManager,
		protected readonly streamHttpClient: StreamHttpClient,
		protected readonly progressManager: ProgressManager
	) {}

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
