import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface MegaTubeExecArgs extends ExecutionArgs {}
export interface MegaTubeOutput extends MegaTubeVideoOutput {}

export interface MegaTubeVideoOutput extends DefaultVideoOutput {
	videoId: string;
	uploader: string;
}
