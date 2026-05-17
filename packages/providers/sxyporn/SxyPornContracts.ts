import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface SxyPornExecArgs extends ExecutionArgs {}
export interface SxyPornOutput extends DefaultExecutionResult, SxyPornVideoOutput {}

export interface SxyPornVideoOutput extends DefaultVideoOutput {
	duration: string;
	uploader: string;
}
