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
 * Describes provider capabilities, integration status, and access restrictions.
 *
 * @remarks
 * Provider metadata lets the execution layer make conservative decisions without
 * hard-coding site behavior into registries, engines, or storage code. It also
 * documents which parts of a provider are verified, still experimental, or
 * blocked by external requirements such as login, browser automation, or geo
 * restrictions.
 */
export interface ProviderMetadata {
	/** Whether the site exposes HLS playlist sources. */
	hasHls: boolean;

	/** Whether HLS sources are wired into the download pipeline. */
	hlsIntegrated?: boolean;

	/** Whether the site exposes direct MP4/progressive sources. */
	hasMp4: boolean;

	/** Whether MP4 sources are wired into the download pipeline. */
	mp4Integrated?: boolean;

	/** Whether the site uses KVS/Kernel Video Sharing page variables. */
	hasKvs: boolean;

	/** Whether the site exposes embeddable video pages. */
	hasEmbeddableVideos?: boolean;

	/** Whether access may vary by region. */
	underGeoRestriction: boolean;

	/** Whether Cloudflare or similar anti-bot handling is expected. */
	cloudflareChallenge?: boolean;

	/** Whether extraction requires browser automation instead of plain HTTP. */
	requiresBrowser: boolean;

	/** Whether the provider is still changing or only partially supported. */
	underDevelopment: boolean;

	/** Whether extraction depends on an external API. */
	needsExternalAPI?: boolean;

	/** Whether downloads are expected to work for supported methods. */
	canDownload?: boolean;

	/** Whether the provider is known to be non-functional. */
	nonFunctional?: boolean;

	/** Whether SNI spoofing is known to cause issues for this site. */
	sniSpoofingIssues?: boolean;

	/** Whether content access requires an authenticated user session. */
	requiresLogin?: boolean;

	/** Current support status for SNI spoofing on this provider. */
	sniSpoofing: SniSpoofStatus;
}
