/**
 * @interface
 * Interface representing the structure of user information retrieved from WallHaven.
 * Contains uploader username, total uploaded content count, and total upload pages.
 */
export interface WallHavenUserInfo {
	/** Uploader username */
	uploader: string;

	/** Total uploaded content count */
	totalContents: number;

	/** Total upload pages */
	totalPages: number;
}
