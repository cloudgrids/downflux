import { VideoSourceOutput } from '../../common/VideoSourceOutput';
import { OkPornAlbumOutput } from './OkPornAlbumOutput';

/**
 * Output structure for OkPorn video operations.
 * Contains video metadata, sources, poster, and album context.
 */
export interface OkPornVideoOutput {
	/** Video identifier */
	videoId: string;

	/** Video title */
	videoTitle: string;

	/** Video page URL */
	videoUrl: string;

	/** Video keywords */
	videoKeywords: string[];

	/** Video description */
	videoDescription: string;

	/** Screenshot image URL */
	videoScreenshot: string;

	/** Video source URLs with detected quality */
	videoSources: VideoSourceOutput[];

	/** Poster image URL */
	videoPoster: string;

	/** Video creation date text */
	videoCreatedAt?: string;

	/** Model name associated with the video */
	modelName: string;

	/** Full source URL when available */
	fullVideoSource?: string;

	/** Album identifier linked to the video */
	videoAlbumId?: string;

	/** Album metadata linked to the video */
	videoAlbum?: OkPornAlbumOutput;
}
