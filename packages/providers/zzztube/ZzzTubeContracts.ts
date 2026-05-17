import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface ZzzTubeExecArgs extends ExecutionArgs {}
export interface ZzzTubeOutput extends DefaultExecutionResult, ZzzTubeVideoOutput {}

export interface ZzzTubeVideoOutput extends DefaultVideoOutput {
	uploader: string;
	actors: string[];
	videoId: string;
}
