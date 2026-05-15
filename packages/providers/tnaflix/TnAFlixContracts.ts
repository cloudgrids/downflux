import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface TnAFlixOutput extends TnAFlixVideoOutput {}

export interface TnAFlixExecArgs extends ExecutionArgs {}

export interface TnAFlixVideo {
	url: string;

	quality: string;

	type: string;
}

export interface TnAFlixVideoOutput extends Omit<DefaultVideoOutput, 'videos'> {
	uploader: string;
	videoId: string;
	videos: TnAFlixVideo[];
	likes: number;
	disLikes: number;
}
