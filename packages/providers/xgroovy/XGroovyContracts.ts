import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface XGroovyExecArgs extends ExecutionArgs {}
export interface XGroovyOutput extends XGroovyVideoOutput {}

export interface XGroovyVideoOutput {
	title: string;
	description: string;
	poster: string;
	pageUrl: string;
	uploaderId: string;
	videos: VideoSourceOutput[];
}
