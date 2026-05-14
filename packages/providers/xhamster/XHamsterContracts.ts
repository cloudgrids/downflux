import { ExecutionArgs } from '@contracts';

export interface XHamsterExecArgs extends ExecutionArgs {}

export interface XHamsterOutput extends XHamsterVideoOutput {}

export interface XHamsterVideoOutput {
	title: string;

	pageUrl: string;

	thumbnailUrl: string;

	description: string;

	masterPlaylistUrl: string;

	defaultVideoUrl: string;

	username: string;
}
