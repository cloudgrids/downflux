import { DefaultStrategy } from './DefaultStrategy';

export class XVideosStrategy extends DefaultStrategy {
	public override getHostFallbackUrls(url: string): string[] {
		let parsed: URL;

		try {
			parsed = new URL(url);
		} catch {
			return [url];
		}

		const pathname = `${parsed.pathname}${parsed.search}${parsed.hash}`;
		const domains = ['xvideos.com', 'xvideos2.com', 'xvideos3.com', 'xvideos1.com'];

		return Array.from(new Set([url, ...domains.map((host) => `${parsed.protocol}//${host}${pathname}`)]));
	}
}
