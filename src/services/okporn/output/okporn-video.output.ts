import { OkPornAlbumOutput } from './okporn-album.output';

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
	videoCreateDate?: string;
	fullVideoSource?: string;
	videoAlbumId?: string;
	videoAlbum?: OkPornAlbumOutput;
}
