import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface BlackPornExecArgs extends ExecutionArgs {}
export interface BlackPornOutput extends DefaultExecutionResult, BlackPornVideoOutput {}

export interface BlackPornVideoOutput extends DefaultVideoOutput {
	uploader: string;
	videoId: string;
}
