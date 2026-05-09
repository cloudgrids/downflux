import { ExecutionArgs, ExecutionResult, PipelineHook, PipelineItem } from '@app/contracts';
import { PipelineRegistry } from '@app/pipelines';
import { ProgressManager } from '@app/progress';
import { OutputType } from '@app/shared';
import { TransformerRegistry } from '@app/transformers';
import { ExecutionShape, ShapeOutput } from '@app/types';
import { TaskCoordinator } from './TaskCoordinator';

export class ExecutionCoordinator {
	private static readonly Default_EXTRACT_CONCURRENCY = 3;

	constructor(
		private readonly transformerRegistry: TransformerRegistry,
		private readonly taskCoordinator: TaskCoordinator,
		private readonly progressManager: ProgressManager,
		private readonly pipelineRegistry: PipelineRegistry
	) {}

	public async execute<TResult, TShape extends ExecutionShape, TExec extends ExecutionArgs<TShape>>(
		request: TExec
	): Promise<ExecutionResult<TResult, TShape>> {
		const { outputType = OutputType.JSON, targets, ...options } = request;

		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook[];
		const errors: Error[] = [];
		const pipelineItems: PipelineItem[] = [];
		const iterables: TResult[] = [];

		this.progressManager.update({ status: 'STARTED', totalTargets: targets.length });

		const transformed = await this.extractMetadataFromTargets<TResult, TExec>(targets, request);

		iterables.push(...transformed);

		iterables.forEach((item) => {
			const items = this.pipelineRegistry.build<TResult, TExec>(item, request);
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

		this.progressManager.update({ status: 'QUEUED', totalItems: result.pipelineItems.length });

		switch (outputType) {
			case OutputType.JSON:
				return this.taskCoordinator.handleJsonOutput<TResult, TShape>(result, options);

			case OutputType.BUFFER:
			case OutputType.DEVICE:
				this.taskCoordinator.handleDeviceOutputAsync<TResult, TShape>(options, outputType, request, pipelineHooks, result);
				return result;

			case OutputType.RETURN:
				return result;

			default:
				throw new Error('Invalid output type');
		}
	}

	private async extractMetadataFromTargets<TResult, TExec extends ExecutionArgs>(targets: string[], request: TExec): Promise<TResult[]> {
		const extractConcurrency = request.extractConcurrency ?? ExecutionCoordinator.Default_EXTRACT_CONCURRENCY;

		const extractedChunks: TResult[][] = new Array(targets.length);

		await this.taskCoordinator.runWithConcurrency(targets, extractConcurrency, async (target, index) => {
			try {
				const result = await this.transformerRegistry.transform<TExec, TResult>(target, {
					...request,
					entryUrl: target,
					referer: target
				});

				extractedChunks[index] = Array.isArray(result) ? result : [result];
			} catch (err) {
				this.progressManager.update({ error: { cause: err, name: 'Extraction Error', message: `Error EXTRACTING ${target}` } });
			}
		});

		return extractedChunks.flat() as TResult[];
	}
}
