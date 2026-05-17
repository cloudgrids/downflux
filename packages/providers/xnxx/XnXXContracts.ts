import { DefaultExecutionResult, DefaultMetadata, ExecutionArgs } from '@contracts';

export interface XnXXExecArgs extends ExecutionArgs {}

export interface XnXXOutput extends DefaultExecutionResult, XnXXVideoOutput {}

export interface XnXXVideo {
	low: string;
	high: string;
	hls: string;
}

export interface XnXXVideoOutput extends DefaultMetadata {
	duration: number;
	videoUrl: XnXXVideo;
	poster: string;
	uploader: string;
	models: string[];
}
