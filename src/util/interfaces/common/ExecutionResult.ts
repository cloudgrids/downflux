import { ExecutionShape, ShapeOutput } from '../../types';
import { ExecutionArgs } from './ExecutionArgs';
import { PipelineItem } from './PipelineItem';

export interface ExecutionResult<TResult, S extends ExecutionShape> extends ExecutionArgs {
	extracted: ShapeOutput<TResult, S>;
	downloaded: number;
	failed: number;
	errors: Error[];
	pipelineItems: PipelineItem[];
}
