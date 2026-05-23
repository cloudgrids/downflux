import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';

export interface PinterestExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
}
export interface PinterestOutput extends DefaultExecutionResult {}
