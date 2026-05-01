import { DownloaderService } from '../downloaders/DownloaderService';
import { FileService } from '../file';
import {
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
	private static readonly DEFAULT_DOWNLOAD_CONCURRENCY = 5;

	constructor(
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService
	) {}

	private async processDownloadsInBackground<T>(
		options: JobOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T>
	): Promise<void> {
		const downloadConcurrency = options.concurrency ?? BackgroundService.DEFAULT_DOWNLOAD_CONCURRENCY;

		await this.runWithConcurrency(result.pipelineItems, downloadConcurrency, async (pipelineItem) => {
			if (options?.signal?.aborted) {
				this.emitProgress(options, {
					status: 'aborted',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed
				});
				return;
			}

			this.runExtractHooks(pipelineHooks, pipelineItem);
			this.emitProgress(options, {
				status: 'downloading',
				totalItems: result.pipelineItems.length,
				downloaded: result.downloaded,
				failed: result.failed,
				item: pipelineItem
			});

			try {
				const downloadResult = await this.downloaderService.download(pipelineItem, {
					...options,
					outputType,
					service: request.service
				});

				result.downloaded++;
				this.runDownloadHooks(pipelineHooks, pipelineItem, downloadResult);
				this.emitProgress(options, {
					status: 'downloaded',
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
				console.error(`Error downloading ${pipelineItem.downloadUrl}:`, err);
				this.emitProgress(options, {
					status: 'failed',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed,
					item: pipelineItem,
					error: normalizedError
				});
			}
		});

		this.emitProgress(options, {
			status: 'completed',
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

	public emitProgress(options: JobOptions, event: JobProgressEvent): void {
		options.onProgress?.(event);
		if (!options.logProgress) return;

		const totals = [
			event.downloaded && `downloaded=${event.downloaded}`,
			event.failed && `failed=${event.failed}`,
			event.totalItems && `total=${event.totalItems}`
		]
			.filter(Boolean)
			.join(' ');

		console.log(`[job:${event.status}]${totals ? ` ${totals}` : ''}`);
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
