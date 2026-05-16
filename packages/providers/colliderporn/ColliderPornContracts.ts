import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface ColliderPornExecArgs extends ExecutionArgs {}
export interface ColliderPornOutput extends ColliderPornVideoOutput {}

export interface ColliderPornVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
}
