import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface XDeguExecArgs extends ExecutionArgs {}
export interface XDeguOutput extends DefaultExecutionResult, XDeguVideoOutput {}

export interface XDeguVideoOutput extends DefaultVideoOutput {
	videoId: string;
	starred: string[];
	previews: string[];
}
