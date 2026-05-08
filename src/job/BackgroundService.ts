import { DownloaderService } from '../downloader';
import { FileService } from '../file';
import { PipelineService } from '../pipelines';
import { ProgressService } from '../progress';
import { TransformerService } from '../transformers';
import {
	DownloadResult,
	ExecutionArgs,
	ExecutionResult,
	ExecutionShape,
	JobOptions,
	OutputType,
	PipelineHook,
	PipelineItem
} from '../util';

export class BackgroundService {
	private static readonly Default_DOWNLOAD_CONCURRENCY = 5;

	constructor(
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService,
		private readonly transformerService: TransformerService,
		private readonly progressService: ProgressService,
		private readonly pipelineService: PipelineService
	) {}

	private async processDownloadsInBackground<T, S extends ExecutionShape>(
		options: JobOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T, S>
	): Promise<void> {
		const downloadConcurrency = options.concurrency ?? BackgroundService.Default_DOWNLOAD_CONCURRENCY;

		await this.runWithConcurrency(result.pipelineItems, downloadConcurrency, async (pipelineItem) => {
			if (options?.signal?.aborted) {
				this.progressService.update({
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

			this.progressService.update({
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
				const downloadResult = await this.downloaderService.download(pipelineItem, {
					...options,
					allowedVideoQuality: request?.allowedVideoQuality,
					outputType,
					service: request.service,
					reExtract: async (item) => {
						const result = await this.transformerService.transform(item.sourceUrl, { ...request, entryUrl: item.sourceUrl });

						const newItems = this.pipelineService.build(result, request);

						return newItems[0] ?? null;
					}
				});

				this.runDownloadHooks(pipelineHooks, pipelineItem, downloadResult);

				this.progressService.update({
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

				this.progressService.update({
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

		this.progressService.update({
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
					this.progressService.update({ status: 'EXTRACTION-HOOK', error: hookResult.reason });
				}
			}
		});
	}

	private runDownloadHooks(hooks: PipelineHook[], item: PipelineItem, result: DownloadResult): void {
		void Promise.allSettled(hooks.map((hook) => hook.onDownload?.({ item, result }))).then((results) => {
			for (const hookResult of results) {
				if (hookResult.status === 'rejected') {
					this.progressService.update({ status: 'DOWNLOADING-HOOK', error: hookResult.reason });
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

	public async handleJsonOutput<T, S extends ExecutionShape>(
		result: ExecutionResult<T, S>,
		options: JobOptions
	): Promise<ExecutionResult<T, S>> {
		this.fileService.toJSON(result, options?.dirConfig?.directoryPath);
		return result;
	}

	public handleDeviceOutputAsync<T, S extends ExecutionShape>(
		options: JobOptions,
		outputType: OutputType,
		request: ExecutionArgs,
		pipelineHooks: PipelineHook[],
		result: ExecutionResult<T, S>
	): void {
		this.processDownloadsInBackground<T, S>(options, outputType, request, pipelineHooks, result).catch((err) => {
			this.progressService.update({
				status: 'FAILED',
				error: { name: 'BackgroundProgress', cause: err, message: 'Background download pipeline error:' }
			});
		});
	}
}
