import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface ShamelessExecArgs extends ExecutionArgs {}
export interface ShamelessOutput extends ShamelessVideoOutput {}

export interface ShamelessVideoOutput extends DefaultVideoOutput {
	id: string;
	categories: string[];
	previews: string[];
	timelineScreenCount?: number;
	timelineScreens?: string[];
	uploader: string;
}
