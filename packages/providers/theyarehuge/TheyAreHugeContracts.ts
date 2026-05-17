import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface TheyAreHugeExecArgs extends ExecutionArgs {}
export interface TheyAreHugeOutput extends DefaultExecutionResult, TheyAreHugeVideoOutput {}

export interface TheyAreHugeVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
	models: string[];
	timelineScreenCount: number;
	timelineScreens: string[];
}
