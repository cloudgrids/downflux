import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface PornIdExecArgs extends ExecutionArgs {}
export interface PornIdOutput extends PornIdVideoOutput {}

export interface PornIdVideoOutput {
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
