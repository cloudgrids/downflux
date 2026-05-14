import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface MyLustExecArgs extends ExecutionArgs {}
export interface MyLustOutput extends MyLustVideoOutput {}

export interface MyLustVideoOutput extends DefaultVideoOutput {
	uploader: string;
	videoId: string;
	actors: string[];
}
