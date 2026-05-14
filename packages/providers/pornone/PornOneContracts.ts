import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface PornOneOutput extends PornOneVideoOutput {
	quality?: string;
}

export interface PornOneExecArgs extends ExecutionArgs {}

export interface PornOneVideoOutput {
	title: string;
	description: string;
	tags?: string[];
	poster: string;
	categories?: string[];
	uploader: string;
	pornStars?: string[];
	pageUrl: string;
	videos: VideoSourceOutput[];
}
