import { DownloaderService } from '../downloaders';
import { FileService } from '../file';
import { emitProgress, emitSegmentProgress } from '../helpers/Emitter';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers';
import { DownloadResult, ExecutionArgs, ExecutionResult, JobOptions, OutputType, PipelineHook, PipelineItem } from '../util';

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
				emitProgress(options, {
					status: 'ABORTED',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed
				});
				return;
			}

			this.runExtractHooks(pipelineHooks, pipelineItem, options);

			emitProgress(options, {
				status: 'DOWNLOADING',
				totalItems: result.pipelineItems.length,
				downloaded: result.downloaded,
				failed: result.failed,
				item: pipelineItem
			});

			try {
				const downloadResult = await this.downloaderService.download(pipelineItem, {
					...options,
					allowedVideoQuality: request?.allowedVideoQuality,
					outputType,
					service: request.service,
					onSegmentProgress: emitSegmentProgress.bind(this, options),
					reExtract: async (item) => {
						const result = await this.transformerService.transform(item.sourceUrl, { ...request, entryUrl: item.sourceUrl });

						const newItems = PipelineService.build(result, request);

						return newItems[0] ?? null;
					}
				});

				result.downloaded++;

				this.runDownloadHooks(pipelineHooks, pipelineItem, downloadResult, options);

				emitProgress(options, {
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

				emitProgress(options, {
					status: 'FAILED',
					totalItems: result.pipelineItems.length,
					downloaded: result.downloaded,
					failed: result.failed,
					item: pipelineItem,
					error: normalizedError
				});
			}
		});

		emitProgress(options, {
			status: 'COMPLETED',
			totalItems: result.pipelineItems.length,
			downloaded: result.downloaded,
			failed: result.failed
		});
	}

	private runExtractHooks(hooks: PipelineHook[], item: PipelineItem, options: JobOptions): void {
		void Promise.allSettled(hooks.map((hook) => hook.onExtract?.(item))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					emitProgress(options, { status: 'EXTRACTION-HOOK', error: hookResult.reason });
				}
			}
		});
	}

	private runDownloadHooks(hooks: PipelineHook[], item: PipelineItem, result: DownloadResult, options: JobOptions): void {
		void Promise.allSettled(hooks.map((hook) => hook.onDownload?.({ item, result }))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					emitProgress(options, { status: 'DOWNLOAD-HOOK', error: hookResult.reason });
				}
			}
		});
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
			emitProgress(options, {
				status: 'FAILED',
				error: { name: 'BackgroundProgress', cause: err, message: 'Background download pipeline error:' }
			});
		});
	}
}
