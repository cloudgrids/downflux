import { DefaultStrategy } from './DefaultStrategy';

export class XnXXStrategy extends DefaultStrategy {
	public override getHostFallbackUrls(url: string): string[] {
		let parsed: URL;

		try {
			parsed = new URL(url);
		} catch {
			return [url];
		}

		const pathname = `${parsed.pathname}${parsed.search}${parsed.hash}`;
		const subDomains = ['xnxx.com', 'xnxx.health', 'xnxx.tv'];

		return Array.from(new Set([url, ...subDomains.map((host) => `${parsed.protocol}//${host}${pathname}`)]));
	}
}
