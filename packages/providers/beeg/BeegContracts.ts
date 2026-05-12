import { ExecutionArgs } from '@contracts';

export interface BeegExecArgs extends ExecutionArgs {
	id: string;
}
export interface BeegOutput extends BeegVideoOutput {}

export interface BeegVideoOutput {
	videos: BeegVideoMetadata[];
	username: string;
	description: string;
	pageUrl: string;
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
