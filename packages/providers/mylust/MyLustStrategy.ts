import { BaseStrategy } from '@base';

/**
 * Provides MyLust-specific HTTP behavior.
 *
 * @remarks
 * Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.
 */
export class MyLustStrategy extends BaseStrategy {
	private SUB_DOMAINS = ['mylust.com', 'ru.mylust.com', 'de.mylust.com'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
