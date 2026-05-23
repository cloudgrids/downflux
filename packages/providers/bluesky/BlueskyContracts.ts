import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';

export interface BlueskyExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
}
export interface BlueskyOutput extends DefaultExecutionResult {}
