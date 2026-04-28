import { DownloaderService } from '../downloaders';
import { OutputType } from '../enums';
import { FileService } from '../file';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers';
import { PipelineHook, PipelineItem } from '../types';
import { ExecutionArguments } from '../types/ExecutionArguments';
import { ExecutionResult } from '../types/ExecutionResult';
import { BackgroundService } from './BackgroundProcess';

export class JobService {
	private static readonly DEFAULT_EXTRACT_CONCURRENCY = 3;

	constructor(
		private readonly transformerService: TransformerService,
		private readonly pipelineService: PipelineService,
		private readonly backgroundService: BackgroundService,
		private readonly fileService: FileService,
		private readonly downloaderService: DownloaderService
	) {
		this.backgroundService = new BackgroundService(this.downloaderService, this.fileService);
	}

	public async execute<T>(request: ExecutionArguments): Promise<ExecutionResult<T>> {
		const { outputType = OutputType.JSON, targets, ...options } = request;

		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook[];
		const extracted: T[] = [];
		const errors: Error[] = [];
		const pipelineItems: PipelineItem[] = [];

		this.backgroundService.emitProgress(options, {
			status: 'started',
			totalTargets: targets.length,
			downloaded: 0,
			failed: 0
		});

		extracted.push(...(await this.extractMetadata<T>(targets, request)));

		for (const metadata of extracted) {
			const items = this.pipelineService.build(metadata, request);
			pipelineItems.push(...items);
		}

		const result: ExecutionResult<T> = {
			...request,
			outputType,
			extracted,
			targetUrls: pipelineItems.map((item) => item.downloadUrl),
			downloaded: 0,
			failed: 0,
			errors,
			pipelineItems
		};

		this.backgroundService.emitProgress(options, {
			status: 'queued',
			totalTargets: targets.length,
			totalItems: result.pipelineItems.length,
			extracted: result.extracted.length,
			downloaded: result.downloaded,
			failed: result.failed
		});

		switch (outputType) {
			case OutputType.JSON:
				return this.backgroundService.handleJsonOutput(result, options);

			case OutputType.BUFFER:
			case OutputType.DEVICE:
				this.backgroundService.handleDeviceOutputAsync(options, outputType, request, pipelineHooks, result);
				return result;

			case OutputType.RETURN:
				return result;

			default:
				throw new Error('Invalid output type');
		}
	}

	private async extractMetadata<T>(targets: string[], request: ExecutionArguments): Promise<T[]> {
		const extractConcurrency = request.extractConcurrency ?? JobService.DEFAULT_EXTRACT_CONCURRENCY;
		const extractedByIndex: Array<T | undefined> = new Array(targets.length);
		let extractedCount = 0;

		await this.backgroundService.runWithConcurrency(targets, extractConcurrency, async (target, index) => {
			this.backgroundService.emitProgress(request, {
				status: 'extracting',
				totalTargets: targets.length
			});

			try {
				extractedByIndex[index] = await this.transformerService.transform<T>(target, request);
				extractedCount++;
				this.backgroundService.emitProgress(request, {
					status: 'extracted',
					totalTargets: targets.length,
					extracted: extractedCount
				});
			} catch (err) {
				console.error(`Error extracting ${target}:`, err);
			}
		});

		return extractedByIndex.filter(Boolean) as T[];
	}
}
