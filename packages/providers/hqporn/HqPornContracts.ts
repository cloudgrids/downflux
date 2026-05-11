import { ExecutionArgs } from '@contracts';

export interface HqPornOutput extends HqPornVideoOutput {}

export interface HqPornExecArgs extends ExecutionArgs {}

export interface HqPornVideoOutput {
	title: string;
	poster: string;
	pageUrl: string;
	videoUrl: string;
	uploader: string;
	videoTags?: string[];
}
