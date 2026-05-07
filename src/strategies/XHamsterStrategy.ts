import { BaseStrategy } from './BaseStrategy';

export class XHamsterStrategy extends BaseStrategy {
	public override getHostFallbackUrls(url: string): string[] {
		let parsed: URL;

		try {
			parsed = new URL(url);
		} catch {
			return [url];
		}

		const pathname = `${parsed.pathname}${parsed.search}${parsed.hash}`;
		const candidates = ['xhamster.com', 'xhopen.com', 'xhtotal.com', 'xhamster.desi'];

		return Array.from(new Set([url, ...candidates.map((host) => `${parsed.protocol}//${host}${pathname}`)]));
	}
}
