import { ExecutionArgs, VideoSourceOutput } from '@contracts';

export interface Lesbian8ExecArgs extends ExecutionArgs {}
export interface Lesbian8Output extends Lesbian8VideoOutput {}

export interface Lesbian8VideoOutput {
	id: string;
	title: string;
	starred: string[];
	videos: VideoSourceOutput[];
	description: string;
	timelineScreenCount: number;
	timelineScreens: string[];
	categories: string[];
	tags: string[];
	poster: string;
	pageUrl: string;
}
