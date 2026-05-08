import { VideoQuality } from '../../../enums';

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
