import { ExecutionArgs } from './ExecutionArgs';
import { PipelineItem } from './PipelineItem';

export interface ExecutionResult<TResult = unknown> extends ExecutionArgs {
	extracted: TResult | TResult[];
	downloaded: number;
	failed: number;
	errors: Error[];
	pipelineItems: PipelineItem[];
}
