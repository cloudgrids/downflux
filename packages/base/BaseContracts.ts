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

	/** Mentioned site supports direct MP4 progressive download */
	hasMp4: boolean;

	/** Integrated MP4 support for better compatibility */
	mp4Integrated?: boolean;

	/** Mentioned site is integrated with KVS (Kernel Video Sharing) */
	hasKvs: boolean;

	/** Mentioned site has embeddable videos available */
	hasEmbeddableVideos?: boolean;

	/** Mentioned site is subject to geographic restrictions */
	underGeoRestriction: boolean;

	/** Mentioned site is protected by Cloudflare anti-bot measures */
	cloudflareChallenge?: boolean;

	/** Mentioned site requires browser automation (e.g. Playwright) */
	requiresBrowser: boolean;

	/** Mentioned site is currently under development or has limited functionality */
	underDevelopment: boolean;

	/** External API integration required */
	needsExternalAPI?: boolean;

	/** Currently available for download */
	canDownload?: boolean;

	/** Mentioned site is currently non-functional or has critical issues */
	nonFunctional?: boolean;

	/** Mentioned site is known to have issues with SNI spoofing */
	sniSpoofingIssues?: boolean;

	/** Mentioned site requires user login for content access */
	requiresLogin?: boolean;

	/** Mentioned site supports SNI spoofing for bypassing geo-restrictions */
	sniSpoofing: SniSpoofStatus;
}
