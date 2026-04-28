import { extname } from 'path';
import { DownloaderService } from '../downloaders/DownloaderService';
import { OutputType, ServiceType } from '../enums';
import { ExtractorService } from '../extractors/ExtractorService';
import { FileService } from '../file/FileService';
import { DownloadResult, PipelineHook, PipelineItem, PipelineResourceType } from '../types';
import { ExecutionArguments } from '../types/ExecutionArguments';
import { ExecutionResult } from '../types/ExecutionResult';
import { JobOptions } from '../types/JobOptions';

export class JobService {
	constructor(
		private readonly extractorService: ExtractorService,
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService
	) {}

	public async execute<T>(request: ExecutionArguments): Promise<ExecutionResult<T>> {
		const { outputType = OutputType.JSON, targets, service, ...options } = request;

		const extractor = this.extractorService.getExtractor(service);
		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook[];

		const extracted: T[] = [];
		const errors: Error[] = [];

		for (const url of targets) {
			if (options?.signal?.aborted) break;

			try {
				const metadata = (await extractor.extractFromUrl(url, request)) as T;
				extracted.push(metadata);
			} catch (err) {
				errors.push(err instanceof Error ? err : new Error(String(err)));
			}
		}

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
				return this.handleDeviceOutput(result, options, outputType, service, pipelineHooks);

			case OutputType.RETURN:
				return result;

			default:
				throw new Error('Invalid output type');
		}
	}

	private async handleJsonOutput<T>(result: ExecutionResult<T>, options: JobOptions): Promise<ExecutionResult<T>> {
		try {
			this.fileService.saveJson(result as any, options?.dirConfig?.path);
			return result;
		} catch (err) {
			result.errors.push(err instanceof Error ? err : new Error(String(err)));
			return result;
		}
	}

	private async handleDeviceOutput<T>(
		result: ExecutionResult<T>,
		options: JobOptions,
		outputType: OutputType,
		service: any,
		pipelineHooks: PipelineHook[]
	): Promise<ExecutionResult<T>> {
		const downloads: DownloadResult[] = [];
		const downloader = this.downloaderService.getDownloader(service);

		for (const extracted of result.extracted) {
			if (options?.signal?.aborted) break;

			try {
				const pipelineItem = this.buildPipelineItem(extracted, service);

				await this.executeHooks(pipelineHooks, 'onExtract', pipelineItem);

				const downloadResult = await downloader.downloadFile(pipelineItem, {
					...options,
					outputType,
					service
				});

				if (outputType === OutputType.DEVICE && downloadResult?.buffer) {
					await this.fileService.saveToDevice(downloadResult.buffer, options?.dirConfig?.path, downloadResult.extendedFilename);
				}

				await this.executeDownloadHooks(pipelineHooks, downloadResult);

				if (downloadResult) downloads.push(downloadResult);
			} catch (err) {
				result.errors.push(err instanceof Error ? err : new Error(String(err)));
			}
		}

		result.downloaded = downloads.length;
		result.failed = result.errors.length;

		return result;
	}

	private buildPipelineItem(extracted: any, service: ServiceType): PipelineItem {
		return {
			sourceUrl: extracted.baseUrl || '',
			downloadUrl: extracted.baseUrl || '',
			resourceType: this.detectResourceType(extracted.baseUrl),
			service
		};
	}

	private detectResourceType(url: string): PipelineResourceType {
		const pathname = extname(url);

		if (/\.(mp4|m3u8|webm|mov|mkv)$/.test(pathname)) return 'video';
		if (/\.(mp3|wav|aac|flac|ogg)$/.test(pathname)) return 'audio';

		return 'image';
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
