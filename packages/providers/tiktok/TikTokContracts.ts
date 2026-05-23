import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';

export interface TikTokExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
}
export interface TikTokOutput extends DefaultExecutionResult {}
