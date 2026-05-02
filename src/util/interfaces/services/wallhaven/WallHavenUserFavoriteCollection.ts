import { WallHavenThumbnail } from './WallHavenThumbnail';

/**
 * @interface
 * Interface for WallHaven user favorite collection metadata and thumbnails.
 */
export interface WallHavenUserFavoriteCollection {
	/** Collection name */
	name: string;

	/** Collection URL */
	url: string;

	/** Collection ID */
	id: string;

	/** Collection uploader username */
	uploader: string;

	/** Background image URL */
	backgroundUrl: string | null;

	/** Collection thumbnail URLs (up to 3) */
	thumbnails: WallHavenThumbnail[];

	/** Total wallpapers in the collection */
	wallPaperCount: number;

	/** Total views for the collection */
	viewCount: number;

	/** Total subscribers for the collection */
	subscriberCount: number;
}
