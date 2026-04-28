import { ExecutionArguments } from './ExecutionArguments';
import { PipelineItem } from './PipelineItem';

export interface ExecutionResult<TExtracted = unknown> extends ExecutionArguments {
	extracted: TExtracted[];
	targetUrls: string[];
	downloaded: number;
	failed: number;
	errors: Error[];
	pipelineItems: PipelineItem[]; // Renamed from pipelineItem to pipelineItems for consistency
}
