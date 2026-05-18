import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface EpicGfsExecArgs extends ExecutionArgs {}
export interface EpicGfsOutput extends DefaultExecutionResult, EpicGfsVideoOutput {}

export interface EpicGfsVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
	previews: string[];
	timelineScreenCount?: number;
	timelineScreens?: string[];
}
