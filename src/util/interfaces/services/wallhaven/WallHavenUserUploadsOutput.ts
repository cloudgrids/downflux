import { WallHavenThumbnail } from './WallHavenThumbnail';
import { WallHavenWallPaperOutput } from './WallHavenWallPaperOutput';

/**
 * Output structure for WallHaven user upload operations.
 * Contains uploader pagination and thumbnail results.
 */
export interface WallHavenUserUploadsOutput {
	/** Uploader username */
	uploader: string;

	/** Total uploaded content count */
	totalContents: number;

	/** Total upload pages */
	totalPages: number;

	/** Current upload page */
	currentPage: number;

	/** Thumbnails found on the upload page */
	thumbnails: WallHavenThumbnail[];

	/** Wallpaper metadata when requested */
	wallPapers?: WallHavenWallPaperOutput[];
}
