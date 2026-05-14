import { ExecutionArgs } from '@contracts';

export interface ColliderPornExecArgs extends ExecutionArgs {}
export interface ColliderPornOutput extends ColliderPornVideoOutput {}

export interface ColliderPornVideoOutput {
	title: string;
	description: string;
	keywords: string[];
	videoId: string;
	videoUrl: {
		low: string;
		high: string;
		hls: string;
	};
	poster: string;
	pageUrl: string;
	uploader: string;
}
