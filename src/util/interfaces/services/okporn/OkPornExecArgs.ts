import { VideoQuality } from '../../../enums';
import { ExecutionArgs, TagFilterOptions } from '../../common';

/** Output format for OkPorn identifiers */
export type OkPornIdType = 'url' | 'path';

/**
 * Video execution arguments for OkPorn operations.
 * Controls quality filtering and identifier format.
 */
export interface OkPornVideoExecArgs {
	/** Allowed video qualities */
	allowedQualities?: VideoQuality[];

	/** Video identifier output format */
	format?: OkPornIdType;
}

/**
 * Execution arguments for OkPorn operations.
 * Extends the shared execution request with service-specific filters.
 */
export interface OkPornExecArgs extends ExecutionArgs {
	/** Video operation arguments */
	videoArgs?: OkPornVideoExecArgs;

	/** Tag filtering arguments */
	tagArgs?: TagFilterOptions;

	/** Channel identifier output format */
	channelArgs?: OkPornIdType;

	/** Model identifier output format */
	modelArgs?: OkPornIdType;
}
