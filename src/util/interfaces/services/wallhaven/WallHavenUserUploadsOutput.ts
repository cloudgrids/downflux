import { WallHavenThumbnail } from './WallHavenThumbnail';
import { WallHavenWallPaperOutput } from './WallHavenWallPaperOutput';

export interface WallHavenUserUploadsOutput {
	/** The username of the uploader */
	uploader: string;
	/** The total number of contents uploaded by the user */
	totalContents: number;
	/** The total number of pages of uploads */
	totalPages: number;
	/** The current page of uploads */
	currentPage: number;
	/** The thumbnails of the user's uploads */
	thumbnails: WallHavenThumbnail[];
	/** The wall papers of the user's uploads, only included if includeMetadata is true in the exec args */
	wallPapers?: WallHavenWallPaperOutput[];
}
