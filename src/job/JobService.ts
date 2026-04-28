import { DownloaderService } from '../downloaders/DownloaderService';
import { OutputType, ServiceType } from '../enums';
import { FileService } from '../file/FileService';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers';
import { DownloadResult, PipelineHook, PipelineItem } from '../types';
import { ExecutionArguments } from '../types/ExecutionArguments';
import { ExecutionResult } from '../types/ExecutionResult';
import { JobOptions } from '../types/JobOptions';

export class JobService {
	constructor(
		private readonly transformerService: TransformerService,
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService,
		private readonly pipelineService: PipelineService
	) {}

	public async execute<T>(request: ExecutionArguments): Promise<ExecutionResult<T>> {
		const { outputType = OutputType.JSON, targets, service, ...options } = request;

		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook[];
		const extracted: T[] = [];
		const errors: Error[] = [];

		extracted.push(...(await this.extractMetadata<T>(targets, request)));

		const result: ExecutionResult<T> = {
			service: request.service,
			method: request.method,
			entryUrl: request.entryUrl,
			targets: request.targets,
			executionType: request.executionType,
			urlType: request.urlType,
			outputType,
			extracted,
			targetUrls: [],
			downloaded: 0,
			failed: 0,
			errors
		};

		switch (outputType) {
			case OutputType.JSON:
				return this.handleJsonOutput(result, options);

			case OutputType.BUFFER:
			case OutputType.DEVICE:
				this.handleDeviceOutputAsync(result.extracted, options, outputType, service, pipelineHooks);
				return result;

			case OutputType.RETURN:
				return result;

			default:
				throw new Error('Invalid output type');
		}
	}

	private async handleJsonOutput<T>(result: ExecutionResult<T>, options: JobOptions): Promise<ExecutionResult<T>> {
		try {
			this.fileService.saveJson(result, options?.dirConfig?.path);
			return result;
		} catch (err) {
			result.errors.push(err instanceof Error ? err : new Error(String(err)));
			return result;
		}
	}

	private async extractMetadata<T>(targets: string[], request: ExecutionArguments): Promise<T[]> {
		const extracted: T[] = [];
		for (const target of targets) {
			try {
				const transformed = await this.transformerService.transform<T>(target, request);
				extracted.push(transformed);
			} catch (err) {
				console.error(`Error extracting ${target}:`, err);
			}
		}
		return extracted;
	}

	private handleDeviceOutputAsync<T>(
		extracted: T[],
		options: JobOptions,
		outputType: OutputType,
		service: ServiceType,
		pipelineHooks: PipelineHook[]
	): void {
		this.processDownloadsInBackground(extracted, options, outputType, service, pipelineHooks).catch((err) => {
			console.error('Background download pipeline error:', err);
		});
	}

	private async processDownloadsInBackground<T>(
		extracted: T[],
		options: JobOptions,
		outputType: OutputType,
		service: ServiceType,
		pipelineHooks: PipelineHook[]
	): Promise<void> {
		for (const metadata of extracted) {
			if (options?.signal?.aborted) break;

			try {
				const pipelineItems = this.pipelineService.build(metadata, service);

				for (const pipelineItem of pipelineItems) {
					await this.executeHooks(pipelineHooks, 'onExtract', pipelineItem);

					const downloadResult = await this.downloaderService.download(pipelineItem, {
						...options,
						outputType,
						service
					});

					if (outputType === OutputType.DEVICE && downloadResult?.buffer) {
						await this.fileService.saveToDevice(
							downloadResult.buffer,
							options?.dirConfig?.path || 'importer_device_output',
							downloadResult.extendedFilename
						);
					}

					await this.executeDownloadHooks(pipelineHooks, downloadResult);
				}
			} catch (err) {
				console.error('Error downloading item:', err);
			}
		}
	}

	private async executeHooks(hooks: PipelineHook[], hookName: 'onExtract', item: PipelineItem): Promise<void> {
		for (const hook of hooks) {
			const hookFn = hook[hookName];
			if (hookFn) {
				await hookFn(item);
			}
		}
	}

	private async executeDownloadHooks(hooks: PipelineHook[], result: DownloadResult): Promise<void> {
		for (const hook of hooks) {
			if (hook.onDownload) {
				await hook.onDownload(result);
			}
		}
	}
}
