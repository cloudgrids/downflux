import { VideoQuality } from '../../../enums';
import { OkPornAlbumOutput } from './OkPornAlbumOutput';

export interface OkPornVideoOutputItem {
	quality: VideoQuality;
	url: string;
}

export interface OkPornVideoOutput {
	modelName?: string;
	videoId: string;
	videoTitle: string;
	videoUrl: string;
	videoKeywords: string[];
	videoDescription: string;
	videoScreenshot: string;
	videoSources: OkPornVideoOutputItem[];
	videoPoster: string;
	videoCreatedAt?: string;
	fullVideoSource?: string;
	videoAlbumId?: string;
	videoAlbum?: OkPornAlbumOutput;
}
