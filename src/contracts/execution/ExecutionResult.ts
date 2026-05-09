import { PipelineItem } from '@app/contracts';
import { ExecutionShape, ShapeOutput } from '@app/types';
import { ExecutionArgs } from './ExecutionArgs';

export interface ExecutionResult<TResult, S extends ExecutionShape> extends ExecutionArgs {
	extracted: ShapeOutput<TResult, S>;
	downloaded: number;
	failed: number;
	errors: Error[];
	pipelineItems: PipelineItem[];
}
