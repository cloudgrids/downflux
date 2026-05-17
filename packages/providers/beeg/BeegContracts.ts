import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface BeegExecArgs extends ExecutionArgs {
	id: string;
}
export interface BeegOutput extends DefaultExecutionResult, BeegVideoOutput {}

export interface BeegVideoOutput extends DefaultVideoOutput {
	username: string;
	videoId: string;
}

export interface BeegVideoMetadata {
	id: number;
	codec: string;
	quality: number;
	video_codec: string;
	audio_codec: string;
	size: number;
	url: string;
}
