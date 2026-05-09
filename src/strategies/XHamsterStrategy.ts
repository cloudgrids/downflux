import { DefaultStrategy } from './DefaultStrategy';

export class XHamsterStrategy extends DefaultStrategy {
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

	public override shouldResolveTextResponse(url: string, contentType: string): boolean {
		return url.includes('https://video-xhpingcdn.com/') && contentType.includes('application/vnd.apple.mpegurl');
	}

	public override getDirectVideoUrlFromText(body: string): string | null {
		const match = body.match(/https?:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*/i);
		return match?.[0] ?? null;
	}
}
