import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface SuperPornExecArgs extends ExecutionArgs {}
export interface SuperPornOutput extends SuperPornVideoOutput {}

export interface SuperPornVideoOutput {
	title: string;
	pageUrl: string;
	description: string;
	poster: string;
	duration: string;
	uploader: string;
	uploadedAt: string;
	width: number;
	height: number;
	quality: string;
	videos: VideoSourceOutput[];
	tags: string[];
}
