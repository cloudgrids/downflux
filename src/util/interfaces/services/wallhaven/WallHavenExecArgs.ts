import { WallHavenThumbnailQuality } from '../../../enums';
import { ExecutionArgs } from '../../common';

export interface WallHavenExecArgs extends ExecutionArgs {
	/** Allowed thumbnail qualities, default is fetched quality */
	thumbQualities?: WallHavenThumbnailQuality[];

	/** Arguments for fetching user uploads */
	userUploadsArgs?: WallHavenUserUploadsExecArgs;
}

/** The props used for fetching user uploads */
export interface WallHavenUserUploadsExecArgs {
	/** The username of the user whose uploads to fetch */
	username: string;
	/** For SFW use purity true and for NSFW use false. Default purity is false. */
	purity?: boolean;
	/** Whether to include metadata for each wall paper e.g WallHavenWallPaperOutput,
	 *  Default is false
	 */
	includeMetadata?: boolean;
}
