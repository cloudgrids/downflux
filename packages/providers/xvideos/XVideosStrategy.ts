import { BaseStrategy } from '@base';

/**
 * Provides XVideos-specific HTTP behavior.
 *
 * @remarks
 * Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.
 */
export class XVideosStrategy extends BaseStrategy {
	private readonly SUB_DOMAINS = ['xvideos.com', 'xvideos2.com', 'xvideos3.com', 'xvideos1.com'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
