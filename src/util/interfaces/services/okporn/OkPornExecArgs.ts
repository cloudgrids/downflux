import { VideoQuality } from '../../../enums';
import { ExecutionArgs, TagFilterOptions } from '../../common';

/** The type of ID to use for channels and models, either the URL or the path segment */
export type OkPornIdType = 'url' | 'path';

/** Execution arguments for fetching videos from OkPorn specially for video-related operations */
export interface OkPornVideoExecArgs {
	/** The video qualities allowed for download, default is all */
	allowedQualities?: VideoQuality[];
	/** The format of the ID to use for channels and models */
	format?: OkPornIdType;
}

/** Execution arguments for fetching videos from OkPorn, including tag and channel/model filtering */
export interface OkPornExecArgs extends ExecutionArgs {
	/** The execution arguments for video-related operations */
	videoArgs?: OkPornVideoExecArgs;
	/** The execution arguments for tag filtering */
	tagArgs?: TagFilterOptions;
	/** The execution arguments for channel filtering */
	channelArgs?: OkPornIdType;
	/** The execution arguments for model filtering */
	modelArgs?: OkPornIdType;
}
