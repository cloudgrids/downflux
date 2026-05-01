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
		private readonly pipelineService: PipelineService,
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

		extracted.push(...(await this.extractMetadata<TResult, TArgs>(targets, request)));

		for (const metadata of extracted) {
			const items = this.pipelineService.build(metadata, request);
			pipelineItems.push(...items);
		}

		const result: ExecutionResult<TResult> = {
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

	private async extractMetadata<TResult, TArgs extends ExecutionArgs>(targets: string[], request: TArgs): Promise<TResult[]> {
		const extractConcurrency = request.extractConcurrency ?? JobService.DEFAULT_EXTRACT_CONCURRENCY;
		const extractedByIndex: Array<TResult | undefined> = new Array(targets.length);
		let extractedCount = 0;

		await this.backgroundService.runWithConcurrency(targets, extractConcurrency, async (target, index) => {
			this.backgroundService.emitProgress(request, {
				status: 'extracting',
				totalTargets: targets.length
			});

			try {
				extractedByIndex[index] = await this.transformerService.transform<TResult, TArgs>(target, {
					...request,
					entryUrl: target,
					referer: target
				});
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

		return extractedByIndex.filter(Boolean) as TResult[];
	}
}
