import { WallHavenThumbnailQuality } from '../../../enums';

export interface WallHavenThumbnail {
	/** The ID of the thumbnail */
	id: string;
	/** The URL of the thumbnail */
	url: string;
	/** The URL of the site where the thumbnail is located */
	siteUrl: string;
	/** The quality of the thumbnail */
	quality: WallHavenThumbnailQuality;
}
