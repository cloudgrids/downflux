import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface ShamelessExecArgs extends ExecutionArgs {}
export interface ShamelessOutput extends ShamelessVideoOutput {}

export interface ShamelessVideoOutput {
	id: string;
	categories: string[];
	tags: string[];
	title: string;
	description: string;
	keywords: string[];
	poster: string;
	previews: string[];
	videos: VideoSourceOutput[];
	timelineScreenCount?: number;
	timelineScreens?: string[];
	uploader: string;
	pageUrl: string;
}
