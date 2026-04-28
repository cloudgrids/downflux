import { ExecutionArguments } from './ExecutionArguments';

export interface ExecutionResult<TExtracted = unknown> extends ExecutionArguments {
	extracted: TExtracted[];
	targetUrls: string[];
	downloaded: number;
	failed: number;
	errors: Error[];
}
