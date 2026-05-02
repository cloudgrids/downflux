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
	userArgs?: WallHavenUserExecArgs;
}

/**
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
