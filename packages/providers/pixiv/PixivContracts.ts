import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';

export interface PixivExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
}
export interface PixivOutput extends DefaultExecutionResult {}
