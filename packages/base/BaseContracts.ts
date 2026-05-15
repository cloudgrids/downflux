import { TagKeys } from '@contracts';
import { SniSpoofStatus } from './BaseTypes';

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
	hasHls: boolean;

	/** Supports MP4 progressive download */
	hasMp4: boolean;

	/** Integrated with KVS (Kernel Video Sharing) */
	hasKvs: boolean;

	/** Subject to geographic restrictions */
	underGeoRestriction: boolean;

	/** Requires browser automation (e.g. Playwright) */
	requiresBrowser: boolean;

	/** Supports SNI spoofing for bypassing geo-restrictions */
	sniSpoofing: SniSpoofStatus;
}
