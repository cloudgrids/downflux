import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface CumLouderExecArgs extends ExecutionArgs {}
export interface CumLouderOutput extends CumLouderVideoOutput {}

export interface CumLouderVideoOutput {
	title: string;
	description: string;
	videos: VideoSourceOutput[];
	poster: string;
	pageUrl: string;
}
