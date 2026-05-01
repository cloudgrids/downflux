import { VideoSourceOutput } from '../../common/VideoSourceOutput';
import { OkPornAlbumOutput } from './OkPornAlbumOutput';

/** The output structure for a video extracted from OkPorn */
export interface OkPornVideoOutput {
	/** The ID of the video eg: 12345 */
	videoId: string;
	/** The title of the video eg: My Awesome Video */
	videoTitle: string;
	/** The URL of the video eg: https://okporn.com/video/12345 */
	videoUrl: string;
	/** The keywords associated with the video eg: keyword1, keyword2 */
	videoKeywords: string[];
	/** The description of the video eg: A collection of my favorite photos */
	videoDescription: string;
	/** The URL of the video screenshot eg: https://okporn.com/video/12345/screenshot.jpg */
	videoScreenshot: string;
	/** The URL of the video poster eg: https://okporn.com/video/12345/poster.jpg */
	videoSources: VideoSourceOutput[];
	/** The URL of the video poster eg: https://okporn.com/video/12345/poster.jpg */
	videoPoster: string;
	/** The date when the video was created eg: 2024-01-01T00:00:00Z */
	videoCreatedAt?: string;
	/** The name of the model associated with the video, if any eg: John-Doe */
	modelName?: string;
	/** The full source URL of the video, if available */
	fullVideoSource?: string;
	/** The ID of the album to which the video belongs, if any eg: 54321 */
	videoAlbumId?: string;
	/** The album to which the video belongs, if any */
	videoAlbum?: OkPornAlbumOutput;
}
