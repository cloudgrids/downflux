import { DownloaderService } from '../downloaders';
import { FileService } from '../file';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers';
import {
	DownloadOptions,
	DownloadResult,
	ExecutionArgs,
	ExecutionResult,
	JobOptions,
	JobProgressEvent,
	OutputType,
	PipelineHook,
	PipelineItem
} from '../util';

export class BackgroundService {
	private static readonly Default_DOWNLOAD_CONCURRENCY = 5;

	constructor(
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService,
		private readonly transformerService: TransformerService
	) {}

	private async processDownloadsInBackground<T>(
		options: JobOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T>
	): Promise<void> {
		const downloadConcurrency = options.concurrency ?? BackgroundService.Default_DOWNLOAD_CONCURRENCY;

		await this.runWithConcurrency(result.pipelineItems, downloadConcurrency, async (pipelineItem) => {
			if (options?.signal?.aborted) {
				this.emitProgress(options, {
					status: 'ABORTED',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed
				});
				return;
			}

			this.runExtractHooks(pipelineHooks, pipelineItem);

			this.emitProgress(options, {
				status: 'DOWNLOADING',
				totalItems: result.pipelineItems.length,
				downloaded: result.downloaded,
				failed: result.failed,
				item: pipelineItem
			});

			try {
				const downloadResult = await this.downloaderService.download(pipelineItem, {
					...options,
					avq: request?.allowedVideoQuality,
					outputType,
					service: request.service,
					onSegmentProgress: this.emitSegmentProgress.bind(this, options),
					reExtract: async (item) => {
						const result = await this.transformerService.transform(item.sourceUrl, { ...request, entryUrl: item.sourceUrl });

						const newItems = PipelineService.build(result, request);

						return newItems[0] ?? null;
					}
				});

				result.downloaded++;

				this.runDownloadHooks(pipelineHooks, pipelineItem, downloadResult);

				this.emitProgress(options, {
					status: 'DOWNLOADED',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed,
					item: pipelineItem,
					result: downloadResult
				});
			} catch (err) {
				result.failed++;

				const normalizedError = err instanceof Error ? err : new Error(String(err));

				result.errors.push(normalizedError);

				console.error(`Error DOWNLOADING ${pipelineItem.downloadUrl}:`, err);
				this.emitProgress(options, {
					status: 'FAILED',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed,
					item: pipelineItem,
					error: normalizedError
				});
			}
		});

		this.emitProgress(options, {
			status: 'COMPLETED',
			totalItems: result.pipelineItems.length,
			downloaded: result.downloaded,
			failed: result.failed
		});
	}

	private runExtractHooks(hooks: PipelineHook[], item: PipelineItem): void {
		void Promise.allSettled(hooks.map((hook) => hook.onExtract?.(item))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					console.error('onExtract hook failed:', hookResult.reason);
				}
			}
		});
	}

	private runDownloadHooks(hooks: PipelineHook[], item: PipelineItem, result: DownloadResult): void {
		void Promise.allSettled(hooks.map((hook) => hook.onDownload?.({ item, result }))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					console.error('onDownload hook failed:', hookResult.reason);
				}
			}
		});
	}

	public emitSegmentProgress(options: DownloadOptions, event: JobProgressEvent): void {
		options.onSegmentProgress?.(event);
		if (!options.logProgress) return;

		const totals = [
			event.target && `TARGET = ${event.target}`,
			event.downloadedBytes && `DOWNLOADED_BYTES = ${event.downloadedBytes}`,
			event.totalBytes && `TOTAL_BYTES = ${event.totalBytes}`,
			event.percent && `PROGRESS = ${event.percent}%`,
			event.segment && `SEGMENT = ${event.segment}`,
			event.totalSegments && `TOTAL_SEGMENTS = ${event.totalSegments}`,
			event.segment && event.totalSegments && `SEGMENTED = ${event.segment}/${event.totalSegments}`
		]
			.filter(Boolean)
			.join('\n');

		console.log(`\n[Downloading:${event.status}]\n${totals ?? ''}\n`);
	}

	public emitProgress(options: JobOptions, event: JobProgressEvent): void {
		options.onProgress?.(event);
		if (!options.logProgress) return;

		const totals = [
			event.downloaded && `DOWNLOADED = ${event.downloaded}`,
			event.failed && `FAILED = ${event.failed}`,
			event.totalItems && `TOTAL = ${event.totalItems}`
		]
			.filter(Boolean)
			.join(' ');

		console.log(`\n[JOB:${event.status}]\n${totals ? ` ${totals}` : ''}\n`);
	}

	public async runWithConcurrency<T>(items: T[], concurrency: number, worker: (item: T, index: number) => Promise<void>): Promise<void> {
		if (!items.length) return;

		const workerCount = Math.max(1, Math.min(concurrency, items.length));
		let currentIndex = 0;

		const runners = Array.from({ length: workerCount }, async () => {
			while (true) {
				const index = currentIndex++;
				if (index >= items.length) return;
				await worker(items[index], index);
			}
		});

		await Promise.all(runners);
	}

	public async handleJsonOutput<T>(result: ExecutionResult<T>, options: JobOptions): Promise<ExecutionResult<T>> {
		this.fileService.toJSON(result, options?.dirConfig?.directoryPath);
		return result;
	}

	public handleDeviceOutputAsync<T>(
		options: JobOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T>
	): void {
		this.processDownloadsInBackground(options, outputType, request, pipelineHooks, result).catch((err) => {
			console.error('Background download pipeline error:', err);
		});
	}
}
