import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface EPornerExecArgs extends ExecutionArgs {}
export interface EPornerOutput extends EPornerVideoOutput {
	hash: string;
}

export interface EPornerVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
}
