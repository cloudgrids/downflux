import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';

export interface InstagramExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
}
export interface InstagramOutput extends DefaultExecutionResult {}
