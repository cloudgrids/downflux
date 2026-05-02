import { WallHavenThumbnail } from './WallHavenThumbnail';
import { WallHavenUserInfoOutput } from './WallHavenUserInfoOutput';
import { WallHavenWallPaperOutput } from './WallHavenWallPaperOutput';

/**
 * @interface
 * Interface representing the output structure for WallHaven user upload operations.
 * Contains uploader pagination and thumbnail results.
 */
export interface WallHavenUserFavoriteCollectionOutput extends WallHavenUserInfoOutput {
	/** Current upload page */
	currentPage: number;

	/** The ID of the favorite collection */
	collectionId: string;

	/** Thumbnails found on the upload page */
	thumbnails: WallHavenThumbnail[];

	/** Wallpaper metadata when requested */
	wallPapers?: WallHavenWallPaperOutput[];
}
