import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface TheyAreHugeExecArgs extends ExecutionArgs {}
export interface TheyAreHugeOutput extends TheyAreHugeVideoOutput {}

export interface TheyAreHugeVideoOutput {
	title: string;
	description: string;
	poster: string;
	videoId: string;
	tags: string[];
	videos: VideoSourceOutput[];
	pageUrl: string;
	uploader: string;
	models: string[];
}
