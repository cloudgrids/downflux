import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface SxyPornExecArgs extends ExecutionArgs {}
export interface SxyPornOutput extends SxyPornVideoOutput {}

export interface SxyPornVideoOutput {
	title: string;
	description: string;
	poster: string;
	tags: string[];
	duration: string;
	videos: VideoSourceOutput[];
	pageUrl: string;
	uploader: string;
}
