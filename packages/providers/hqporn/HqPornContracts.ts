import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface HqPornOutput extends HqPornVideoOutput {}

export interface HqPornExecArgs extends ExecutionArgs {}

export interface HqPornVideoOutput {
	title: string;
	poster: string;
	pageUrl: string;
	videos: VideoSourceOutput[];
	uploader: string;
	videoTags?: string[];
}
