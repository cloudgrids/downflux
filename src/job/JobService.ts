import { PipelineService } from '../pipelines';
import { ProgressService } from '../progress';
import { TransformerService } from '../transformers';
import { ExecutionArgs, ExecutionResult, ExecutionShape, OutputType, PipelineHook, PipelineItem, ShapeOutput } from '../util';
import { BackgroundService } from './BackgroundService';

export class JobService {
	private static readonly Default_EXTRACT_CONCURRENCY = 3;

	constructor(
		private readonly transformerService: TransformerService,
		private readonly backgroundService: BackgroundService,
		private readonly progressService: ProgressService,
		private readonly pipelineService: PipelineService
	) {}

	public async execute<TResult, TShape extends ExecutionShape, TExec extends ExecutionArgs<TShape>>(
		request: TExec
	): Promise<ExecutionResult<TResult, TShape>> {
		const { outputType = OutputType.JSON, targets, ...options } = request;

		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook[];
		const errors: Error[] = [];
		const pipelineItems: PipelineItem[] = [];
		const iterables: TResult[] = [];

		this.progressService.update({ status: 'STARTED', totalTargets: targets.length });

		const transformed = await this.extractMetadataFromTargets<TResult, TExec>(targets, request);

		iterables.push(...transformed);

		iterables.forEach((item) => {
			const items = this.pipelineService.build<TResult, TExec>(item, request);
			pipelineItems.push(...items);
		});

		const result: ExecutionResult<TResult, TShape> = {
			...request,
			outputType,
			extracted: (request.executionShape === 'single' ? iterables[0] : iterables) as ShapeOutput<TResult, TShape>,
			downloaded: 0,
			failed: 0,
			errors,
			pipelineItems
		};

		this.progressService.update({ status: 'QUEUED', totalItems: result.pipelineItems.length });

		switch (outputType) {
			case OutputType.JSON:
				return this.backgroundService.handleJsonOutput<TResult, TShape>(result, options);

			case OutputType.BUFFER:
			case OutputType.DEVICE:
				this.backgroundService.handleDeviceOutputAsync<TResult, TShape>(options, outputType, request, pipelineHooks, result);
				return result;

			case OutputType.RETURN:
				return result;

			default:
				throw new Error('Invalid output type');
		}
	}

	private async extractMetadataFromTargets<TResult, TExec extends ExecutionArgs>(targets: string[], request: TExec): Promise<TResult[]> {
		const extractConcurrency = request.extractConcurrency ?? JobService.Default_EXTRACT_CONCURRENCY;

		const extractedChunks: TResult[][] = new Array(targets.length);

		await this.backgroundService.runWithConcurrency(targets, extractConcurrency, async (target, index) => {
			try {
				const result = await this.transformerService.transform<TExec, TResult>(target, {
					...request,
					entryUrl: target,
					referer: target
				});

				extractedChunks[index] = Array.isArray(result) ? result : [result];
			} catch (err) {
				this.progressService.update({ error: { cause: err, name: 'Extraction Error', message: `Error EXTRACTING ${target}` } });
			}
		});

		return extractedChunks.flat() as TResult[];
	}
}
