import { DefaultMetadata, ExecutionArgs } from '@contracts';

export interface XHamsterExecArgs extends ExecutionArgs {}

export interface XHamsterOutput extends XHamsterVideoOutput {}

export interface XHamsterVideoOutput extends DefaultMetadata {
	thumbnailUrl: string;
	masterPlaylistUrl: string;
	defaultVideoUrl: string;
	username: string;
}
