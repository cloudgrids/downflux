import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface SexVidExecArgs extends ExecutionArgs {}
export interface SexVidOutput extends SexVidVideoOutput {}

export interface SexVidVideoOutput {
	title: string;
	description: string;
	tags: string[];
	poster: string;
	duration: number;
	releasedAt: string;
	actor: string;
	pageUrl: string;
	videos: VideoSourceOutput[];
}
