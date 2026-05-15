import { TagKeys } from '@contracts';

/**
 * Options for filtering tag output.
 * Used by tag-based service operations.
 */
export interface TagFilterOptions {
	/** Allowed tag keys */
	allowedKeys?: TagKeys[];

	/**
	 * Output format for tag values
	 * @defaultValue 'path'
	 */
	format?: 'path' | 'url';
}

/**
 * Metadata describing provider capabilities and restrictions.
 */
export interface ProviderMetadata {
	/** Supports HLS streaming */
	hls: boolean;

	/** Supports MP4 progressive download */
	mp4: boolean;

	/** Integrated with KVS (Kernel Video Sharing) */
	kvs: boolean;

	/** Subject to geographic restrictions */
	geoRestriction: boolean;

	/** Requires browser automation (e.g. Playwright) */
	needsBrowser: boolean;
}
