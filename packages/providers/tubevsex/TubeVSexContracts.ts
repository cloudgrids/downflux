import { ExecutionArgs } from '@contracts';

export interface TubeVSexExecArgs extends ExecutionArgs {}
export interface TubeVSexOutput extends TubeVSexVideoOutput {}

export interface TubeVSexVideoOutput {
	videoId: string;
	title: string;
	pageUrl: string;
	poster: string;
	width: string;
	height: string;
	duration: string;
	quality: string;
	videoUrl: string;
	uploader: string;
	uploadedAt: string;
	categories: string[];
}
