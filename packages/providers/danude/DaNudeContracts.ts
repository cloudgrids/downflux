import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface DaNudeExecArgs extends ExecutionArgs {}
export interface DaNudeOutput extends DefaultExecutionResult, DaNudeVideoOutput {}

export interface DaNudeVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
	previews: string[];
	timelineScreenCount?: number;
	timelineScreens?: string[];
}
