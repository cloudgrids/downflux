import { ExecutionArgs } from '@contracts';

export interface SuperPornExecArgs extends ExecutionArgs {}
export interface SuperPornOutput extends SuperPornVideoOutput {}

export interface SuperPornVideoOutput {
	title: string;
	pageUrl: string;
	description: string;
	poster: string;
	videoUrl: string;
	uploader: string;
	tags: string[];
}
