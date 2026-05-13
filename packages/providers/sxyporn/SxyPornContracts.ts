import { ExecutionArgs } from '@contracts';

export interface SxyPornExecArgs extends ExecutionArgs {}
export interface SxyPornOutput extends SxyPornVideoOutput {}

export interface SxyPornVideoOutput {
	title: string;
	description: string;
	poster: string;
	tags: string[];
	videoUrl: string;
	pageUrl: string;
	uploader: string;
}
