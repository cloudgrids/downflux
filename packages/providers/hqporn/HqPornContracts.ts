import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface HqPornOutput extends DefaultExecutionResult, HqPornVideoOutput {}

export interface HqPornExecArgs extends ExecutionArgs {}

export interface HqPornVideoOutput extends DefaultVideoOutput {
	uploader: string;
}
