import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface PussySpaceExecArgs extends ExecutionArgs {}
export interface PussySpaceOutput extends PussySpaceVideoOutput {
	token: string;
}

export interface PussySpaceVideoOutput {
	poster: string;
	title: string;
	videos: VideoSourceOutput[];
	description: string;
	pageUrl: string;
}
