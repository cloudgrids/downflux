import { ExecutionArgs } from '@contracts';

export interface PornOneOutput extends PornOneVideoOutput {}

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
	videoUrl: string;
}
