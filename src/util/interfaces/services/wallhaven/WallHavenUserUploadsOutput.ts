import { WallHavenThumbnail } from './WallHavenThumbnail';
import { WallHavenUserInfo } from './WallHavenUserInfo';
import { WallHavenWallPaperOutput } from './WallHavenWallPaperOutput';

/**
 * @interface
 * Interface representing the output structure for WallHaven user upload operations.
 * Contains uploader pagination and thumbnail results.
 */
export interface WallHavenUserUploadsOutput extends WallHavenUserInfo {
	/** Current upload page */
	currentPage: number;

	/** Thumbnails found on the upload page */
	thumbnails: WallHavenThumbnail[];

	/** Wallpaper metadata when requested */
	wallPapers?: WallHavenWallPaperOutput[];
}
