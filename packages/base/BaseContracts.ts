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
	/** Mentioned site supports HLS streaming */
	hasHls: boolean;

	/** Integrated HLS support for better compatibility */
	hlsIntegrated?: boolean;

	/** Mentioned site supports MP4 progressive download */
	hasMp4: boolean;

	/** Integrated MP4 support for better compatibility */
	mp4Integrated?: boolean;

	/** Mentioned site is integrated with KVS (Kernel Video Sharing) */
	hasKvs: boolean;

	/** Mentioned site is subject to geographic restrictions */
	underGeoRestriction: boolean;

	/** Mentioned site requires browser automation (e.g. Playwright) */
	requiresBrowser: boolean;

	/** Mentioned site supports SNI spoofing for bypassing geo-restrictions */
	sniSpoofing: SniSpoofStatus;
}
