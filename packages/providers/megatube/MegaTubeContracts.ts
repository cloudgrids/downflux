import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface MegaTubeExecArgs extends ExecutionArgs {}
export interface MegaTubeOutput extends MegaTubeVideoOutput {}

export interface MegaTubeVideoOutput {
	title: string;
	description: string;
	poster: string;
	videoId: string;
	videos: VideoSourceOutput[];
	tags: string[];
	pageUrl: string;
	uploader: string;
}
