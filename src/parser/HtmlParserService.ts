import { OkPornModelVideoCard } from '../util';

export class HtmlParserService {
	public extractElementText(html: string, begin: string, end: string, fallback = ''): string {
		const start = html.indexOf(begin);
		if (start === -1) return fallback;
		const from = start + begin.length;
		const to = html.indexOf(end, from);
		if (to === -1) return fallback;
		return html.slice(from, to);
	}

	public extractElementTextPair(html: string, begin: string, end: string, pos = 0): [string | null, number] {
		const start = html.indexOf(begin, pos);
		if (start === -1) return [null, pos];
		const from = start + begin.length;
		const to = html.indexOf(end, from);
		if (to === -1) return [null, pos];
		return [html.slice(from, to), to + end.length];
	}

	public *extractAllPairs(html: string, begin: string, end: string): Generator<string> {
		let pos = 0;
		const blen = begin.length;
		const elen = end.length;
		while (true) {
			const start = html.indexOf(begin, pos);
			if (start === -1) break;
			const from = start + blen;
			const to = html.indexOf(end, from);
			if (to === -1) break;
			yield html.slice(from, to);
			pos = to + elen;
		}
	}

	public extractAll(
		html: string,
		rules: Array<[key: string, begin: string, end: string]>,
		startPos = 0
	): [Record<string, string>, number] {
		let pos = startPos;
		const result: Record<string, string> = {};
		for (const [key, begin, end] of rules) {
			const [value, nextPos] = this.extractElementTextPair(html, begin, end, pos);
			if (key && value !== null) result[key] = value;
			pos = nextPos;
		}
		return [result, pos];
	}

	public extractAnchors(html: string, baseUrl?: string): string[] {
		const seen = new Set<string>();
		for (const delimiter of ['"', "'"]) {
			for (const raw of this.extractAllPairs(html, `href=${delimiter}`, delimiter)) {
				const url = this.resolveUrl(raw.trim(), baseUrl);
				if (url) seen.add(url);
			}
		}
		return [...seen];
	}

	public extractAnchorTextsByHref(html: string, hrefPattern: RegExp): string[] {
		const seen = new Set<string>();
		const anchorPattern = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
		let match: RegExpExecArray | null;

		while ((match = anchorPattern.exec(html)) !== null) {
			const [, , href, text] = match;
			if (!href || !text) continue;

			hrefPattern.lastIndex = 0;
			if (!hrefPattern.test(href)) continue;

			const label = this.decodeHtmlEntities(text.replace(/<[^>]*>/g, '').trim());
			if (label) seen.add(label);
		}

		return [...seen];
	}

	public extractImageUrls(html: string): string[] {
		const attrs = ['data-original="', 'data-src="', 'data-lazy="', 'src="'];
		const seen = new Set<string>();
		for (const attr of attrs) {
			for (const url of this.extractAllPairs(html, attr, '"')) {
				if (url.startsWith('http')) seen.add(url);
			}
		}
		return [...seen];
	}

	public extractSourceUrls(html: string): string[] {
		const urls: string[] = [];
		for (const url of this.extractAllPairs(html, '<source src="', '"')) {
			if (url.startsWith('http')) urls.push(url);
		}
		return [...new Set(urls)];
	}

	public extractVideoPosters(html: string): string[] {
		const urls: string[] = [];
		for (const url of this.extractAllPairs(html, 'poster="', '"')) {
			if (url.startsWith('http')) urls.push(url);
		}
		return [...new Set(urls)];
	}

	public extractDivHrefs(html: string): string[] {
		const urls: string[] = [];
		const re = /<div[^>]+href="([^"]+)"/g;
		let m: RegExpExecArray | null;
		while ((m = re.exec(html)) !== null) {
			if (m[1]) urls.push(m[1]);
		}
		return [...new Set(urls)];
	}

	public extractVideoUrls(html: string): string[] {
		const urls: string[] = [];
		const re = /<video[^>]*src="([^"]+)"/g;
		let m: RegExpExecArray | null;
		while ((m = re.exec(html)) !== null) {
			if (m[1].startsWith('http')) urls.push(m[1]);
		}
		return [...new Set(urls)];
	}

	public extractAllUrls(html: string): string[] {
		return [...html.matchAll(/https?:\/\/[^\s"'<>\\]+/g)].map((m) => m[0]);
	}

	public extractVideoCards(html: string, baseUrl?: string): OkPornModelVideoCard[] {
		const anchorRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
		let match: RegExpExecArray | null;
		const results: OkPornModelVideoCard[] = [];

		while ((match = anchorRegex.exec(html)) !== null) {
			const attrs = match[1];
			const inner = match[2];

			const previewMatch = /data-preview-custom="([^"]+)"/i.exec(attrs);
			if (!previewMatch) continue;

			const hrefMatch = /href="([^"]+)"/i.exec(attrs);
			const titleMatch = /title="([^"]+)"/i.exec(attrs);

			const imgMatch = /<img\b([^>]+)>/i.exec(inner);
			let imgSrc = '';
			if (imgMatch) {
				const imgAttrs = imgMatch[1];
				const dataOriginalMatch = /data-original="([^"]+)"/i.exec(imgAttrs);
				const srcMatch = /src="([^"]+)"/i.exec(imgAttrs);

				imgSrc = dataOriginalMatch ? dataOriginalMatch[1] : srcMatch ? srcMatch[1] : '';
			}

			const durationMatch = /<span[^>]*class="[^"]*duration_item[^"]*"[^>]*>\s*([\d:]+)\s*<\/span>/i.exec(inner);
			let duration = '';
			if (durationMatch) duration = durationMatch[1];
			const videoUrl = this.resolveUrl(hrefMatch?.[1] ?? '', baseUrl) ?? hrefMatch?.[1] ?? '';
			results.push({
				videoId: videoUrl.split('/').filter(Boolean).pop() ?? '',
				customTitle: titleMatch ? this.decodeHtmlEntities(titleMatch[1]) : '',
				preview: this.resolveUrl(previewMatch[1], baseUrl) ?? previewMatch[1],
				screenShot: this.resolveUrl(imgSrc, baseUrl) ?? imgSrc,
				duration
			});
		}
		return results;
	}

	public extractMetaDescription(html: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, 'name="description" content="', '"') ||
				this.extractElementText(html, "name='description' content='", "'") ||
				this.extractElementText(html, 'name=description content="', '"')
		);
	}

	public extractCustomTitle(html: string): string {
		return this.extractElementText(html, 'class="item" href="', '"');
	}

	public extractMetaKeywords(html: string): string[] {
		const raw =
			this.extractElementText(html, 'name="keywords" content="', '"') ||
			this.extractElementText(html, "name='keywords' content='", "'");
		return raw
			.split(',')
			.map((k) => k.trim())
			.filter(Boolean);
	}

	public extractTitle(html: string): string {
		return this.decodeHtmlEntities(this.extractElementText(html, '<title>', '</title>'));
	}

	public resolveUrl(raw: string, base?: string): string | null {
		if (!raw) return null;
		try {
			return new URL(raw, base).toString();
		} catch {
			return null;
		}
	}

	public decodeHtmlEntities(str: string): string {
		return str
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
			.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
	}
}
