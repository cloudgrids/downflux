import { BaseStrategy } from '@base';

/**
 * Provides XHamster-specific HTTP behavior.
 *
 * @remarks
 * Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.
 */
export class XHamsterStrategy extends BaseStrategy {
	private SUB_DOMAINS = ['xhamster.com', 'xhopen.com', 'xhtotal.com', 'xhamster.desi'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}

	public override shouldResolveTextResponse(url: string, contentType: string): boolean {
		return url.includes('https://video-xhpingcdn.com/') && contentType.includes('application/vnd.apple.mpegurl');
	}

	public override getDirectVideoUrlFromText(body: string): string | null {
		const match = body.match(/https?:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*/i);
		return match?.[0] ?? null;
	}
}
