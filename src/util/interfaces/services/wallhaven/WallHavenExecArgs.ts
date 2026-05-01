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
	/** For SFW use purity 100 and for NSFW use 110. Default purity is 110. */
	purity?: 100 | 110;
	/** Whether to include metadata for each wall paper */
	includeMetadata?: boolean;
}
