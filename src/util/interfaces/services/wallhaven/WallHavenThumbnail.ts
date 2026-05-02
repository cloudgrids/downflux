import { WallHavenThumbnailQuality } from '../../../enums';

/**
 * @interface
 * Interface representing a WallHaven thumbnail.
 * Contains thumbnail URL, wallpaper ID, page URL, and quality.
 */
export interface WallHavenThumbnail {
	/** Thumbnail image URL */
	url: string;

	/** Wallpaper identifier */
	id: string;

	/** WallHaven wallpaper page URL */
	siteUrl: string;

	/** Thumbnail quality */
	quality: WallHavenThumbnailQuality;
}
