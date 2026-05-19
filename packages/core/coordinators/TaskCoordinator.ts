import { DownloadResult, ExecutionArgs, ExecutionOptions, ExecutionResult, PipelineHook, PipelineItem } from '@contracts';
import { ProgressManager } from '@core/progress';
import { PipelineRegistry, TransformerRegistry } from '@core/registries';
import { FileManager } from '@storage';
import { ExecutionShape, OutputType } from '@types';
import { TransferCoordinator } from './TransferCoordinator';

/**
 * Coordinates concurrent work within an execution result.
 *
 * @remarks
 * The task coordinator owns concurrency, hooks, progress updates, and output
 * mode behavior. It keeps download scheduling separate from provider methods
 * and from the lower-level transfer code that writes individual items.
 */
export class TaskCoordinator {
	private static readonly Default_DOWNLOAD_CONCURRENCY = 5;

	constructor(
		private readonly transferCoordinator: TransferCoordinator,
		private readonly fileManager: FileManager,
		private readonly transformerRegistry: TransformerRegistry,
		private readonly progressManager: ProgressManager,
		private readonly pipelineRegistry: PipelineRegistry
	) {}

	private async processDownloadsInBackground<T, S extends ExecutionShape>(
		options: ExecutionOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T, S>
	): Promise<void> {
		const downloadConcurrency = options.concurrency ?? TaskCoordinator.Default_DOWNLOAD_CONCURRENCY;

		await this.runWithConcurrency(result.pipelineItems, downloadConcurrency, async (pipelineItem) => {
			if (options?.signal?.aborted) {
				this.progressManager.update({
					status: 'ABORTED',
					currentTarget: pipelineItem.sourceUrl,
					currentItem: pipelineItem.downloadUrl,
					totalItems: result.pipelineItems.length,
					resolvedItems: result.downloaded,
					resolvedTargets: result.targets.indexOf(pipelineItem.sourceUrl),
					failed: result.failed
				});
				return;
			}

			this.runExtractHooks(pipelineHooks, pipelineItem);

			this.progressManager.update({
				status: 'DOWNLOADING',
				currentTarget: pipelineItem.sourceUrl,
				currentItem: pipelineItem.downloadUrl,
				totalItems: result.pipelineItems.length,
				resolvedItems: result.downloaded,
				failed: result.failed,
				item: pipelineItem,
				resolvedTargets: result.targets.indexOf(pipelineItem.sourceUrl)
			});

			try {
				const downloadResult = await this.transferCoordinator.download(pipelineItem, {
					...options,
					outputType,
					provider: request.provider,
					reExtract: async (item) => {
						const result = await this.transformerRegistry.transform(item.sourceUrl, { ...request, entryUrl: item.sourceUrl });

						const newItems = await this.pipelineRegistry.build(result, request);

						return newItems[0] ?? null;
					}
				});

				this.runDownloadHooks(pipelineHooks, pipelineItem, downloadResult);

				this.progressManager.update({
					status: 'DOWNLOADED',
					totalItems: result.pipelineItems.length,
					resolvedItems: result.downloaded++,
					failed: result.failed,
					item: pipelineItem,
					resolvedTargets: result.targets.indexOf(pipelineItem.sourceUrl) + 1,
					result: downloadResult
				});
			} catch (err) {
				const normalizedError = err instanceof Error ? err : new Error(String(err));

				result.errors.push(normalizedError);

				this.progressManager.update({
					status: 'FAILED',
					currentItem: pipelineItem.downloadUrl,
					currentTarget: pipelineItem.sourceUrl,
					totalItems: result.pipelineItems.length,
					resolvedItems: result.downloaded,
					failed: result.failed++,
					item: pipelineItem,
					resolvedTargets: result.targets.indexOf(pipelineItem.sourceUrl),
					error: normalizedError
				});
			}
		});

		this.progressManager.update({
			status: 'COMPLETED',
			totalItems: result.pipelineItems.length,
			resolvedItems: result.downloaded,
			failed: result.failed
		});
	}

	private runExtractHooks(hooks: PipelineHook[], item: PipelineItem): void {
		void Promise.allSettled(hooks.map((hook) => hook.onExtract?.(item))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					this.progressManager.update({ status: 'EXTRACTION-HOOK', error: hookResult.reason });
				}
			}
		});
	}

	private runDownloadHooks(hooks: PipelineHook[], item: PipelineItem, result: DownloadResult): void {
		void Promise.allSettled(hooks.map((hook) => hook.onDownload?.({ item, result }))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					this.progressManager.update({ status: 'DOWNLOADING-HOOK', error: hookResult.reason });
				}
			}
		});
	}

	/**
	 * Runs asynchronous workers with a bounded concurrency limit.
	 *
	 * @param items Items to process.
	 * @param concurrency Maximum number of active workers.
	 * @param worker Async item handler.
	 */
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

	/**
	 * Persists a JSON execution result.
	 *
	 * @param result Execution result to serialize.
	 * @param options Output options containing directory configuration.
	 * @returns The original execution result.
	 */
	public async handleJsonOutput<T, S extends ExecutionShape>(
		result: ExecutionResult<T, S>,
		options: ExecutionOptions
	): Promise<ExecutionResult<T, S>> {
		this.fileManager.toJSON(result, options?.dirConfig?.directoryPath);
		return result;
	}

	/**
	 * Starts background download processing for device or buffer output.
	 *
	 * @param options Execution options.
	 * @param outputType Output mode.
	 * @param request Original execution request.
	 * @param pipelineHooks Hooks fired around extraction/download events.
	 * @param result Execution result to update while downloads progress.
	 */
	public handleDeviceOutputAsync<T, S extends ExecutionShape>(
		options: ExecutionOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T, S>
	): void {
		this.processDownloadsInBackground<T, S>(options, outputType, request, pipelineHooks, result).catch((err) => {
			this.progressManager.update({
				status: 'FAILED',
				error: { name: 'BackgroundProgress', cause: err, message: 'Background download pipeline error:' }
			});
		});
	}
}
