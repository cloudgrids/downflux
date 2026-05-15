import { DefaultMetadata, ExecutionArgs } from '@contracts';

export interface XVideosExecArgs extends ExecutionArgs {}

export interface XVideosOutput extends XVideosVideoOutput {}

export interface XVideosVideo {
	low: string;
	high: string;
	hls: string;
}

export interface XVideosVideoOutput extends DefaultMetadata {
	duration: number;
	videoUrl: XVideosVideo;
	poster: string;
	uploader: string;
	models: string[];
}
