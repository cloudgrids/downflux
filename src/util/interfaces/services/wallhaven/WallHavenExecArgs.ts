import { WallHavenThumbnailQuality } from '../../../enums';
import { ExecutionArgs } from '../../common';

/**
 * Execution arguments for WallHaven operations.
 * Adds thumbnail and user upload options.
 */
export interface WallHavenExecArgs extends ExecutionArgs {
	/** Allowed thumbnail qualities */
	thumbQualities?: WallHavenThumbnailQuality[];

	/** User upload execution arguments */
	userUploadsArgs?: WallHavenUserUploadsExecArgs;
}

/**
 * Execution arguments for WallHaven user uploads.
 * Controls uploader, purity, and metadata expansion.
 */
export interface WallHavenUserUploadsExecArgs {
	/** Uploader username */
	username: string;

	/** Purity-safe upload listing flag */
	purity?: boolean;

	/** Includes full wallpaper metadata for each thumbnail */
	includeMetadata?: boolean;
}
