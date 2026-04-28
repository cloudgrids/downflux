import { OkPornAlbumOutput } from './OkPornAlbumOutput';

export interface OkPornVideoOutput {
	modelName?: string;
	videoId: string;
	videoTitle: string;
	videoUrl: string;
	videoKeywords: string[];
	videoDescription: string;
	videoScreenshot: string;
	videoSources: string[];
	videoPoster: string;
	videoCreatedAt?: string;
	fullVideoSource?: string;
	videoAlbumId?: string;
	videoAlbum?: OkPornAlbumOutput;
}
