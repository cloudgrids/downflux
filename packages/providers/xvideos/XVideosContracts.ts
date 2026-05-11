import { ExecutionArgs } from '@contracts';

export interface XVideosExecArgs extends ExecutionArgs {}

export interface XVideosOutput extends XVideosVideoOutput {}

export interface XVideosVideo {
	low: string;
	high: string;
	hls: string;
}

export interface XVideosVideoOutput {
	title: string;
	description: string;
	duration: number;
	videoUrl: XVideosVideo;
	keywords: string[];
	pageUrl: string;
	poster: string;
	uploader: string;
	models: string[];
}
