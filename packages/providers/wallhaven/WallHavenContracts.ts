import { ExecutionArgs } from '@contracts';
import { WallHavenThumbnailQuality } from './WallHavenTypes';

/**
 * @interface
 * Execution arguments for WallHaven operations.
 * Adds thumbnail and user upload options.
 */
export interface WallHavenExecArgs extends ExecutionArgs {
	/** Allowed thumbnail qualities */
	thumbQualities?: WallHavenThumbnailQuality[];

	/** User upload execution arguments */
	userArgs?: WallHavenUserExecArgs;

	/** User favorite collection execution arguments */
	collectionArgs?: WallHavenUserFavoritesExecArgs;
}

/**
 * @interface
 * Execution arguments for WallHaven user uploads.
 * Controls uploader, purity, and metadata expansion.
 */
export interface WallHavenUserExecArgs {
	/** Uploader username */
	username: string;

	/** Purity-safe upload listing flag, default is false */
	purity?: boolean;

	/** Includes full wallpaper metadata for each thumbnail */
	includeMetadata?: boolean;
}

/**
 * @interface
 * Execution arguments for WallHaven user favorites collection.
 * Extends user upload arguments with favorites collection ID.
 */
export interface WallHavenUserFavoritesExecArgs extends WallHavenUserExecArgs {
	/** Favorites collection ID */
	collectionId: string;
}

/**
 * @interface
 * Combined output structure for WallHaven operations.
 * Used for broad internal service typing.
 *
 * @internal
 */
export interface WallHavenOutput
	extends
		WallHavenWallPaperOutput,
		WallHavenUserUploadsOutput,
		WallHavenWallPaperOutput,
		WallHavenUserFavoriteCollectionOutput,
		WallHavenUserInfoOutput {
	collections: WallHavenUserFavoriteCollectionsOutput[];
}

/**
 * @interface
 * Interface representing the output structure for WallHaven wallpaper operations.
 * Contains wallpaper metadata, dimensions, uploader, and thumbnails.
 */
export interface WallHavenWallPaperOutput {
	/** Wallpaper identifier */
	id: string;

	/** Wallpaper title */
	title: string;

	/** Wallpaper description */
	description: string;

	/** Wallpaper tags */
	tags: string[];

	/** View count */
	views: number;

	/** Favorite count */
	favorites: number;

	/** Purity label */
	purity: string;

	/** Category label */
	category: string;

	/** Wallpaper width in pixels */
	dimensionX: number;

	/** Wallpaper height in pixels */
	dimensionY: number;

	/** Resolution text */
	resolution: string;

	/** Aspect ratio text */
	ratio: string;

	/** File size in bytes */
	size: number;

	/** Uploader username */
	uploader: string;

	/** Creation date text */
	createdAt: string;

	/** Update date text */
	updatedAt: string;

	/** Wallpaper thumbnails */
	thumbnails: WallHavenThumbnail[];
}

/**
 * @interface
 * Interface representing the output structure for WallHaven user upload operations.
 * Contains uploader pagination and thumbnail results.
 */
export interface WallHavenUserUploadsOutput extends WallHavenUserInfoOutput {
	/** Current upload page */
	currentPage: number;

	/** Thumbnails found on the upload page */
	thumbnails: WallHavenThumbnail[];

	/** Wallpaper metadata when requested */
	wallPapers?: WallHavenWallPaperOutput[];
}

/**
 * @interface
 * Interface representing the structure of user information retrieved from WallHaven.
 * Contains uploader username, total uploaded content count, and total upload pages.
 */
export interface WallHavenUserInfoOutput {
	/** Uploader username */
	uploader: string;

	/** Total uploaded content count */
	totalContents: number;

	/** Total upload pages */
	totalPages: number;
}

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

/**
 * @interface
 * Interface for WallHaven user favorite collection metadata and thumbnails.
 */
export interface WallHavenUserFavoriteCollectionsOutput {
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
