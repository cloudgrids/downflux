import { WallHavenThumbnail } from './WallHavenThumbnail';

/**
 * Interface for WallHaven user favorite collection metadata and thumbnails.
 */
export interface WallHavenUserFavoriteCollection {
	/** Collection name */
	name: string;

	/** Collection URL */
	url: string;

	/** Background image URL */
	backgroundUrl: string;

	/** Collection thumbnail URLs (up to 3) */
	thumbnails: WallHavenThumbnail[];

	/** Total wallpapers in the collection */
	wallpapersCount: number;

	/** Total views for the collection */
	viewsCount: number;

	/** Total subscribers for the collection */
	subscribersCount: number;
}
