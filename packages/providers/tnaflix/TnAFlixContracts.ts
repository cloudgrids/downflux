import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface TnAFlixOutput extends TnAFlixVideoOutput {}

export interface TnAFlixExecArgs extends ExecutionArgs {}

export interface TnAFlixVideoOutput extends DefaultVideoOutput {
	uploader: string;
	videoId: string;
	likes: number;
	disLikes: number;
}
