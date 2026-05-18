import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface PornSevenExecArgs extends ExecutionArgs {}
export interface PornSevenOutput extends DefaultExecutionResult, PornSevenVideoOutput {}

export interface PornSevenVideoOutput extends DefaultVideoOutput {
	uploader: string;
	videoId: string;
}
