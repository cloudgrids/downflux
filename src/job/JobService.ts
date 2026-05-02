import { DownloaderService } from '../downloaders/DownloaderService';
import { FileService } from '../file';
import { PipelineService } from '../pipelines';
import { TransformerService } from '../transformers';
import { ExecutionArgs, ExecutionResult, OutputType, PipelineHook, PipelineItem } from '../util';
import { BackgroundService } from './BackgroundProcess';

export class JobService {
	private static readonly DEFAULT_EXTRACT_CONCURRENCY = 3;

	constructor(
		private readonly transformerService: TransformerService,
		private readonly backgroundService: BackgroundService,
		private readonly fileService: FileService,
		private readonly downloaderService: DownloaderService
	) {
		this.backgroundService = new BackgroundService(this.downloaderService, this.fileService);
	}

	public async execute<TResult, TArgs extends ExecutionArgs>(request: TArgs): Promise<ExecutionResult<TResult>> {
		const { outputType = OutputType.JSON, targets, ...options } = request;

		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook[];
		const extracted: TResult[] = [];
		const errors: Error[] = [];
		const pipelineItems: PipelineItem[] = [];

		this.backgroundService.emitProgress(options, {
			status: 'started',
			totalTargets: targets.length,
			downloaded: 0,
			failed: 0
		});

		const extractionResult = await this.extractMetadata<TResult, TArgs>(targets, request);
		extracted.push(...extractionResult.metadata);

		extracted.forEach((metadata) => {
			const items = PipelineService.build(metadata, request);
			pipelineItems.push(...items);
		});

		const result: ExecutionResult<TResult> = {
			...request,
			outputType,
			extracted,
			downloaded: 0,
			failed: 0,
			errors,
			pipelineItems
		};

		this.backgroundService.emitProgress(options, {
			status: 'queued',
			totalTargets: extractionResult.totalTargets,
			totalItems: result.pipelineItems.length,
			extracted: extractionResult.extractedCount,
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

	private async extractMetadata<TResult, TArgs extends ExecutionArgs>(
		targets: string[],
		request: TArgs
	): Promise<{ metadata: TResult[]; totalTargets: number; extractedCount: number }> {
		const extractConcurrency = request.extractConcurrency ?? JobService.DEFAULT_EXTRACT_CONCURRENCY;
		const extractedByIndex: Array<TResult | undefined> = new Array(targets.length);
		let totalExtractTargets = targets.length;
		let extractedCount = 0;

		const emitExtractProgress: ExecutionArgs['onExtractProgress'] = ({ status, target, countTarget }) => {
			if (status === 'extracting' && countTarget) totalExtractTargets++;
			if (status === 'extracted') extractedCount++;

			this.backgroundService.emitProgress(request, {
				status,
				target,
				totalTargets: totalExtractTargets,
				...(status === 'extracted' ? { extracted: extractedCount } : {})
			});
		};

		await this.backgroundService.runWithConcurrency(targets, extractConcurrency, async (target, index) => {
			emitExtractProgress({
				status: 'extracting',
				target
			});

			try {
				extractedByIndex[index] = await this.transformerService.transform<TResult, TArgs>(target, {
					...request,
					entryUrl: target,
					referer: target,
					onExtractProgress: emitExtractProgress
				});
				emitExtractProgress({
					status: 'extracted',
					target
				});
			} catch (err) {
				console.error(`Error extracting ${target}:`, err);
			}
		});

		return {
			metadata: extractedByIndex.filter(Boolean) as TResult[],
			totalTargets: totalExtractTargets,
			extractedCount
		};
	}
}
