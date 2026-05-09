import { ExecutionArgs } from '@app/contracts';
import { VideoQuality } from '@app/shared';
import { TagFilterOptions } from '../default';

/**
 * @type
 *  Output format for OkPorn identifiers */
export type OkPornIdType = 'url' | 'path';

/**
 * @interface
 * Interface representing video execution arguments for OkPorn operations.
 * Controls quality filtering and identifier format.
 */
export interface OkPornVideoExecArgs {
	/**
	 * @defaultValue all quality allowed if not specified
	 *  Allowed video quality */
	quality?: VideoQuality;

	/**
	 * @defaultValue `url` if not specified
	 *  Video identifier output format */
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
