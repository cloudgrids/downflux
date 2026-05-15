import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface SexVidExecArgs extends ExecutionArgs {}
export interface SexVidOutput extends SexVidVideoOutput {}

export interface SexVidVideoOutput extends DefaultVideoOutput {
	duration: number;
	releasedAt: string;
	actor: string;
}
