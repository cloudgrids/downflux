import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface TubeVSexExecArgs extends ExecutionArgs {}
export interface TubeVSexOutput extends TubeVSexVideoOutput {}

export interface TubeVSexVideoOutput extends DefaultVideoOutput {
	videoId: string;
	width: string;
	height: string;
	duration: string;
	quality: string;
	uploader: string;
	uploadedAt: string;
	categories: string[];
}
