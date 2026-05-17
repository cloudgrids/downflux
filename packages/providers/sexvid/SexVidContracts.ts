import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface SexVidExecArgs extends ExecutionArgs {}
export interface SexVidOutput extends DefaultExecutionResult, SexVidVideoOutput {}

export interface SexVidVideoOutput extends DefaultVideoOutput {
	duration: number;
	releasedAt: string;
	actor: string;
}
