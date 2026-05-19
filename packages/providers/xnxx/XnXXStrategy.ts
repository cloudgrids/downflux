import { BaseStrategy } from '@base';

/**
 * Provides XnXX-specific HTTP behavior.
 *
 * @remarks
 * Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.
 */
export class XnXXStrategy extends BaseStrategy {
	private SUB_DOMAINS = ['xnxx.com', 'xnxx.health', 'xnxx.tv'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
