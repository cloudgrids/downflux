import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface AnalRzExecArgs extends ExecutionArgs {}
export interface AnalRzOutput extends DefaultExecutionResult, AnalRzVideoOutput {}

export interface AnalRzVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
	actors: string[];
	height: string;
	width: string;
}
