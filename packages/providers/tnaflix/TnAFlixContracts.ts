import { ExecutionArgs } from '@contracts';

export interface TnAFlixOutput extends TnAFlixVideoOutput {}

export interface TnAFlixExecArgs extends ExecutionArgs {}

export interface TnAFlixVideo {
	url: string;

	quality: string;

	type: string;
}

export interface TnAFlixVideoOutput {
	title: string;

	uploader: string;

	videoId: string;

	videos: TnAFlixVideo[];

	videoPoster: string;

	pageUrl: string;

	videoTags?: string[];

	likes: number;

	disLikes: number;
}
