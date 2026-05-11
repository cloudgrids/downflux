import { ExecutionArgs } from '@contracts';
import { VideoQuality } from '@types';

export interface XHamsterExecArgs extends ExecutionArgs {}

export interface XHamsterOutput extends XHamsterVideoOutput {}

export interface XHamsterVideo {
	url: string;
	quality: VideoQuality;
}

export interface XHamsterVideoOutput {
	title: string;

	pageUrl: string;

	thumbnailUrl: string;

	description: string;

	masterPlaylistUrl: string;

	defaultVideoUrl: string;

	username: string;
}
