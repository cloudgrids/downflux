import { DefaultExecutionResult, FlashVarsOutput, VideoSourceOutput } from '@contracts';
import { GenericException } from '@core/exceptions';
import { KvsResolver } from '@shared';
import { ProviderType, VideoQuality } from '@types';

export class BaseParser {
	protected kvsResolver = new KvsResolver();
	public transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult> {
		try {
			return {
				anchors: this.extractAnchors(html, sourceUrl),
				images: this.extractImageUrls(html),
				sources: this.extractSourceUrls(html),
				title: this.extractTitle(html) || this.extractMetaPropertyContent(html, 'og:title'),
				description: this.extractMetaDescription(html) || this.extractMetaPropertyContent(html, 'og:description'),
				keywords: this.extractMetaKeywords(html),
				links: this.extractLinks(html),
				videos: this.extractVideoUrls(html),
				sourceUrl,
				status: 200
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Default, 'BaseParser', { cause: error });
		}
	}

	public extractScriptMethodInput(fnName: string, html: string): string | null {
		const re = new RegExp(`${fnName}\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'i');
		const m = re.exec(html);
		return m ? m[1] : null;
	}

	public getFlashVars(html: string): FlashVarsOutput {
		const extractField = (field: string) => {
			const re = new RegExp(`${field}\\s*:\\s*['"]([^'"]+)['"]`, 'i');

			const match = re.exec(html);

			return match?.[1] || undefined;
		};

		const videoModels = extractField('video_models')
			?.split(',')
			.map((v) => v?.trim());
		const timelineScreenUrl = extractField('timeline_screens_url');
		const timelineScreenCount = extractField('timeline_screens_count')
			? parseInt(extractField('timeline_screens_count')!, 10)
			: undefined;
		const title = extractField('video_title');
		const tags = extractField('video_tags')
			?.split(',')
			?.map((v) => v?.trim());
		const categories = extractField('video_categories')
			?.split(',')
			?.map((v) => v?.trim());
		const models = extractField('video_models')
			?.split(',')
			?.map((v) => v?.trim());
		const previewUrl = extractField('preview_url');
		const previewUrl1 = extractField('preview_url1');
		const previewUrl2 = extractField('preview_url2');
		const previewUrl3 = extractField('preview_url3');
		const videoAltUrl2Redirect = extractField('video_alt_url2_redirect');
		const videoAltUrl2Text = extractField('video_alt_url2_text');
		const videoAltUrl2Hd = extractField('video_alt_url2_hd');
		const videoAltUrl2 = extractField('video_alt_url2');
		const videoAltUrlText = extractField('video_alt_url_text');
		const videoUrlHd = extractField('video_url_hd');
		const videoUrlText = extractField('video_url_text');
		const videoAltUrl = extractField('video_alt_url')?.match(/((?:function\/0\/)?https.*)/i)?.[0];
		const videoUrl = extractField('video_url')?.match(/((?:function\/\d+\/)?https.*)/i)?.[0];
		const postfix = extractField('postfix');
		const rnd = extractField('rnd');
		const licenseCode = extractField('license_code');
		const videoId = extractField('video_id');

		const urlQuality = (videoUrlText?.replace(/[^0-9p]+/i, '') as VideoQuality) || VideoQuality.QUnknown;
		const url1Quality = (videoAltUrlText?.replace(/[^0-9p]+/i, '') as VideoQuality) || VideoQuality.QUnknown;
		const url2Quality = (videoAltUrl2Text?.replace(/[^0-9p]+/i, '') as VideoQuality) || VideoQuality.QUnknown;

		const url =
			videoUrl && licenseCode
				? {
						url: this.kvsResolver.resolveKvsUrl(videoUrl, licenseCode),
						quality: urlQuality
					}
				: { url: videoUrl, quality: urlQuality };

		const url1 =
			videoAltUrl && licenseCode
				? {
						url: this.kvsResolver.resolveKvsUrl(videoAltUrl, licenseCode),
						quality: url1Quality
					}
				: { url: videoAltUrl, quality: url1Quality };

		const url2 =
			videoAltUrl2 && licenseCode
				? {
						url: this.kvsResolver.resolveKvsUrl(videoAltUrl2, licenseCode),
						quality: url2Quality
					}
				: { url: videoAltUrl2, quality: url2Quality };

		const videos = [url, url1, url2].filter((v) => v.url) as VideoSourceOutput[];
		const previews = [previewUrl, previewUrl1, previewUrl2, previewUrl3].filter(Boolean) as string[];
		const timelineScreens = Array.from({ length: timelineScreenCount ?? 0 }, (_, i) =>
			timelineScreenUrl ? timelineScreenUrl.replace('{time}', (i + 1).toString()) : undefined
		) as string[];

		return {
			videoId,
			licenseCode,
			rnd,
			postfix,
			videoAltUrl2,
			videoUrl,
			videoAltUrl,
			videoAltUrl2Hd,
			videoAltUrl2Text,
			videoUrlHd,
			videoUrlText,
			videoAltUrlText,
			videoAltUrl2Redirect,
			previewUrl,
			tags,
			categories,
			models,
			title,
			videoModels,
			timelineScreenUrl,
			timelineScreenCount,
			previewUrl1,
			previewUrl2,
			previewUrl3,
			videos,
			previews,
			timelineScreens
		};
	}

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

		try {
			while (true) {
				const start = html.indexOf(begin, pos);
				if (start === -1) break;
				const from = start + blen;
				const to = html.indexOf(end, from);
				if (to === -1) break;
				yield html.slice(from, to);
				pos = to + elen;
			}
		} catch {
			throw new Error('Unable to extract all pairs');
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

	public extractAnchors(html: string, sourceUrl?: string): string[] {
		const seen = new Set<string>();
		try {
			for (const delimiter of ['"', "'"]) {
				for (const raw of this.extractAllPairs(html, `href=${delimiter}`, delimiter)) {
					const url = this.resolveUrl(raw.trim(), sourceUrl);
					if (url) seen.add(url);
				}
			}
			return [...seen];
		} catch {
			throw new Error('Unable to extract anchors');
		}
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

		try {
			for (const attr of attrs) {
				for (const url of this.extractAllPairs(html, attr, '"')) {
					if (url.startsWith('http')) seen.add(url);
				}
			}
			return [...seen];
		} catch {
			throw new Error('Unable to extract image urls');
		}
	}

	public extractSourceUrls(html: string): string[] {
		const urls: string[] = [];

		try {
			for (const url of this.extractAllPairs(html, '<source src="', '"')) {
				if (url.startsWith('http')) urls.push(url);
			}
			return [...new Set(urls)];
		} catch {
			throw new Error('Unable to extract image urls');
		}
	}

	public extractVideoPosters(html: string): string[] {
		const urls: string[] = [];

		try {
			for (const url of this.extractAllPairs(html, 'poster="', '"')) {
				if (url.startsWith('http')) urls.push(url);
			}
			return [...new Set(urls)];
		} catch {
			throw new Error('Unable to extract image urls');
		}
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

	public extractLinks(html: string): string[] {
		const urls: string[] = [];
		const re = /<link\b[^>]*\brel=(['"])(?:preload|preload\s+stylesheet|stylesheet\s+preload)\1[^>]*\bhref=(['"])([^'"]+)\2[^>]*>/gi;
		let match: RegExpExecArray | null;

		while ((match = re.exec(html)) !== null) {
			if (match[3]) urls.push(match[3]);
		}

		return [...new Set(urls)];
	}

	public extractMetaDescription(html: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, 'name="description" content="', '"') ||
				this.extractElementText(html, "name='description' content='", "'") ||
				this.extractElementText(html, 'name=description content="', '"')
		);
	}

	public extractMetaNameContent(html: string, value: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, `name="${value}" content="`, '"') ||
				this.extractElementText(html, `name='${value}' content='`, "'") ||
				this.extractElementText(html, `name=${value} content="`, '"')
		);
	}

	public extractMetaPropertyContent(html: string, value: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, `property="${value}" content="`, '"') ||
				this.extractElementText(html, `property='${value}' content='`, "'") ||
				this.extractElementText(html, `property=${value} content="`, '"')
		);
	}

	public collectAnchors(
		html: string,
		options?: {
			sourceUrl?: string;
			className?: string;
			hrefPattern?: RegExp;
		}
	) {
		const results: {
			href: string;
			text: string;
			title?: string;
		}[] = [];

		const regex = /<a\b([^>]*)>(?:([\s\S]*?)<\/a>)?/gi;

		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			const attrs = match[1];
			const inner = match[2] ?? '';

			const hrefMatch = /href=["']([^"']+)["']/.exec(attrs);
			if (!hrefMatch) continue;

			let href = hrefMatch[1].trim();

			if (options?.hrefPattern && !options.hrefPattern.test(href)) continue;

			if (options?.className) {
				const classMatch = /class=["']([^"']+)["']/.exec(attrs);
				const classes = classMatch?.[1] ?? '';

				if (!new RegExp(`\\b${options.className}\\b`).test(classes)) continue;
			}

			href = this.resolveUrl(href, options?.sourceUrl) ?? href;

			const text = this.decodeHtmlEntities(inner.replace(/<[^>]*>/g, '').trim());

			const title = /title=["']([^"']+)["']/.exec(attrs)?.[1];

			results.push({
				href,
				text,
				title
			});
		}

		return results;
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

	public extractByTag(
		html: string,
		tag: string,
		options?: {
			className?: string;
			attribute?: string;
		}
	): string[] {
		const results: string[] = [];

		const classPattern = options?.className ? `[^>]*class=["'][^"']*${options.className}[^"']*["']` : `[^>]*`;

		const attrPattern = options?.attribute ? `[^>]*${options.attribute}` : `[^>]*`;

		const regex = new RegExp(`<${tag}\\b${classPattern}${attrPattern}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');

		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			const clean = this.decodeHtmlEntities(match[1].replace(/<[^>]*>/g, '').trim());
			if (clean) results.push(clean);
		}

		return results;
	}

	public extractOneByTag(html: string, tag: string, options?: { className?: string }): string | null {
		return this.extractByTag(html, tag, options)[0] ?? null;
	}

	public extractScriptsByType(html: string, type: string): string[] {
		const results = new Set<string>();
		const scriptTagPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
		const typePattern = new RegExp(`(?:^|\\s)type\\s*=\\s*(["'])${type.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1(?:\\s|$)`, 'i');

		let match: RegExpExecArray | null;

		while ((match = scriptTagPattern.exec(html)) !== null) {
			const attrs = match[1] ?? '';
			if (!typePattern.test(attrs)) continue;

			const content = match[2]?.trim();
			if (content) results.add(content);
		}

		return [...results];
	}

	public extractByClass(html: string, className: string): string[] {
		const regex = new RegExp(`<([a-z0-9]+)\\b[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, 'gi');

		const results: string[] = [];
		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			const clean = this.decodeHtmlEntities(match[2].replace(/<[^>]*>/g, '').trim());
			if (clean) results.push(clean);
		}

		return results;
	}

	public extractAttributes(html: string, tag: string, attr: string): string[] {
		const regex = new RegExp(`<${tag}\\b[^>]*${attr}=["']([^"']+)["']`, 'gi');

		const results: string[] = [];
		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			results.push(match[1]);
		}

		return [...new Set(results)];
	}

	public extractSpans(html: string, className?: string) {
		return this.extractByTag(html, 'span', { className });
	}

	public extractDivs(html: string, className?: string) {
		return this.extractByTag(html, 'div', { className });
	}

	public extractAnchorsContent(html: string, className?: string) {
		return this.extractByTag(html, 'a', { className });
	}

	public extractH2s(html: string, className?: string) {
		return this.extractByTag(html, 'h2', { className });
	}

	public extractH3s(html: string, className?: string) {
		return this.extractByTag(html, 'h3', { className });
	}

	public extractLists(html: string, className?: string) {
		return this.extractByTag(html, 'li', { className });
	}

	public extractBlocks(html: string, tag: string, className?: string): string[] {
		const classPattern = className ? `[^>]*class=["'][^"']*${className}[^"']*["']` : `[^>]*`;

		const regex = new RegExp(`<${tag}\\b${classPattern}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');

		return [...html.matchAll(regex)].map((m) => m[0]);
	}

	public extractKeyValue(html: string, keyPattern: RegExp, valuePattern: RegExp): Record<string, string> {
		const result: Record<string, string> = {};

		const keys = [...html.matchAll(keyPattern)];
		const values = [...html.matchAll(valuePattern)];

		keys.forEach((k, i) => {
			const key = this.decodeHtmlEntities(k[1]?.trim());
			const value = values[i]?.[1]?.trim();
			if (key && value) result[key] = value;
		});

		return result;
	}

	public collectByClassNames(
		html: string,
		classNames: string | string[],
		options?: {
			includeInnerHTML?: boolean;
			attributes?: string[];
			sourceUrl?: string;
		}
	) {
		const classes = Array.isArray(classNames) ? classNames : [classNames];

		const classPattern = classes.map((c) => `(?=[^"']*\\b${c}\\b)`).join('');

		const regex = new RegExp(`<([a-z0-9]+)\\b[^>]*class=["']${classPattern}[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, 'gi');

		const results: any[] = [];
		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			const full = match[0];
			const tag = match[1];
			const innerHTML = match[2];

			const text = this.decodeHtmlEntities(innerHTML.replace(/<[^>]*>/g, '').trim());

			const item: any = { tag, text };

			if (options?.attributes) {
				item.attributes = {};
				for (const attr of options.attributes) {
					const attrMatch = new RegExp(`${attr}=["']([^"']+)["']`, 'i').exec(full);
					if (attrMatch) {
						let value = attrMatch[1];
						if (options.sourceUrl) {
							value = this.resolveUrl(value, options.sourceUrl) ?? value;
						}
						item.attributes[attr] = value;
					}
				}
			}

			if (options?.includeInnerHTML) {
				item.innerHTML = innerHTML;
			}

			results.push(item);
		}

		return results;
	}
}
