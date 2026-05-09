import { ExecutionArgs } from '@app/contracts';
import { WallHavenThumbnailQuality } from '@app/shared';

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
