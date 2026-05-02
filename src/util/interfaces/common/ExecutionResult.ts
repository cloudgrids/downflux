import { ExecutionArgs } from './ExecutionArgs';
import { PipelineItem } from './PipelineItem';

export interface ExecutionResult<TExtracted = unknown> extends ExecutionArgs {
	extracted: TExtracted[];
	downloaded: number;
	failed: number;
	errors: Error[];
	pipelineItems: PipelineItem[];
}
