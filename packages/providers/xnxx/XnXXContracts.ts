import { ExecutionArgs } from '@contracts';

export interface XnXXExecArgs extends ExecutionArgs {}

export interface XnXXOutput extends XnXXVideoOutput {}

export interface XnXXVideo {
	low: string;
	high: string;
	hls: string;
}

export interface XnXXVideoOutput {
	title: string;
	description: string;
	duration: number;
	videoUrl: XnXXVideo;
	keywords: string[];
	pageUrl: string;
	poster: string;
	uploader: string;
	models: string[];
}
