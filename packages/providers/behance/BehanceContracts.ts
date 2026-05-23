import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';

export interface BehanceExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
}
export interface BehanceOutput extends DefaultExecutionResult {}
