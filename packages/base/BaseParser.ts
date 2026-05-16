import { DefaultExecutionResult, FlashVarsOutput, VideoSourceOutput } from '@contracts';
import { GenericException } from '@core/exceptions';
import { KvsResolver } from '@shared';
import { ProviderType, VideoQuality } from '@types';

export class BaseParser {
	protected kvsResolver = new KvsResolver();
	protected transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult> {
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

	protected extractScriptMethodInput(fnName: string, html: string): string | null {
		const re = new RegExp(`${fnName}\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'i');
		const m = re.exec(html);
		return m ? m[1] : null;
	}

	protected getFlashVars(html: string): FlashVarsOutput {
		const flashVarsBlocks = [...html.matchAll(/var\s+flashVars\s*=\s*\{([\s\S]*?)\};/gi)].map((m) => m[1]);

		if (!flashVarsBlocks.length) {
			return {} as FlashVarsOutput;
		}

		const extractFields = (field: string): string[] => {
			const re = new RegExp(`${field}\\s*:\\s*['"]([^'"]+)['"]`, 'gi');

			return flashVarsBlocks.flatMap((block) => [...block.matchAll(re)].map((m) => m[1]));
		};

		const extractField = (field: string): string | undefined => {
			return extractFields(field)[0];
		};

		const unique = <T>(arr: T[]) => Array.from(new Set(arr));

		const parseList = (field: string): string[] => {
			return unique(
				extractFields(field)
					.flatMap((v) => v.split(','))
					.map((v) => v.trim())
					.filter(Boolean)
			);
		};

		const resolveVideo = (rawUrl?: string, quality?: string, licenseCode?: string): VideoSourceOutput | undefined => {
			if (!rawUrl) return undefined;

			const cleaned = rawUrl.match(/((?:function\/\d+\/)?https.*)/i)?.[0];

			if (!cleaned) return undefined;

			return {
				url: licenseCode ? this.kvsResolver.resolveKvsUrl(cleaned, licenseCode) : cleaned,
				quality: (quality?.replace(/[^0-9p]+/gi, '') as VideoQuality) ?? VideoQuality.QUnknown
			};
		};

		const licenseCode = extractField('license_code');

		const videoUrls = extractFields('video_url');
		const videoUrlTexts = extractFields('video_url_text');

		const altVideoUrls = extractFields('video_alt_url');
		const altVideoTexts = extractFields('video_alt_url_text');

		const alt2VideoUrls = extractFields('video_alt_url2');
		const alt2VideoTexts = extractFields('video_alt_url2_text');

		const videosRaw = [
			...videoUrls.map((url, i) => resolveVideo(url, videoUrlTexts[i], licenseCode)),

			...altVideoUrls.map((url, i) => resolveVideo(url, altVideoTexts[i], licenseCode)),

			...alt2VideoUrls.map((url, i) => resolveVideo(url, alt2VideoTexts[i], licenseCode))
		].filter(Boolean) as VideoSourceOutput[];

		const videos = Array.from(new Map(videosRaw.map((v) => [v.url, v])).values());

		const previews = unique(
			[
				...extractFields('preview_url'),
				...extractFields('preview_url1'),
				...extractFields('preview_url2'),
				...extractFields('preview_url3'),
				...extractFields('preview_url4')
			].filter(Boolean)
		);

		const timelineScreenUrl = extractField('timeline_screens_url');

		const timelineScreenCount = extractField('timeline_screens_count')
			? parseInt(extractField('timeline_screens_count') ?? '0', 10)
			: undefined;

		const timelineScreens = Array.from({ length: timelineScreenCount ?? 0 }, (_, i) =>
			timelineScreenUrl ? timelineScreenUrl.replace('{time}', String(i + 1)) : undefined
		).filter(Boolean) as string[];

		return {
			videoId: extractField('video_id'),
			licenseCode,
			rnd: extractField('rnd'),
			postfix: extractField('postfix'),

			videoUrl: extractField('video_url'),
			videoAltUrl: extractField('video_alt_url'),
			videoAltUrl2: extractField('video_alt_url2'),

			videoUrlHd: extractField('video_url_hd'),
			videoUrlText: extractField('video_url_text'),

			videoAltUrlText: extractField('video_alt_url_text'),

			videoAltUrl2Text: extractField('video_alt_url2_text'),
			videoAltUrl2Hd: extractField('video_alt_url2_hd'),
			videoAltUrl2Redirect: extractField('video_alt_url2_redirect'),

			previewUrl: extractField('preview_url'),
			previewUrl1: extractField('preview_url1'),
			previewUrl2: extractField('preview_url2'),
			previewUrl3: extractField('preview_url3'),
			previewUrl4: extractField('preview_url4'),

			title: extractField('video_title'),

			tags: parseList('video_tags'),
			categories: parseList('video_categories'),
			models: parseList('video_models'),
			videoModels: parseList('video_models'),

			timelineScreenUrl,
			timelineScreenCount,

			videos,
			previews,
			timelineScreens
		};
	}

	protected extractElementText(html: string, begin: string, end: string, fallback = ''): string {
		const start = html.indexOf(begin);
		if (start === -1) return fallback;
		const from = start + begin.length;
		const to = html.indexOf(end, from);
		if (to === -1) return fallback;
		return html.slice(from, to);
	}

	protected extractElementTextPair(html: string, begin: string, end: string, pos = 0): [string | null, number] {
		const start = html.indexOf(begin, pos);
		if (start === -1) return [null, pos];
		const from = start + begin.length;
		const to = html.indexOf(end, from);
		if (to === -1) return [null, pos];
		return [html.slice(from, to), to + end.length];
	}

	protected *extractAllPairs(html: string, begin: string, end: string): Generator<string> {
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

	protected extractAll(
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

	protected extractAnchors(html: string, sourceUrl?: string): string[] {
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

	protected extractAnchorTextsByHref(html: string, hrefPattern: RegExp): string[] {
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

	protected extractImageUrls(html: string): string[] {
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

	protected extractSourceUrls(html: string): string[] {
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

	protected collectElements(html: string, type: string): Record<string, string>[] {
		const regex = new RegExp(`<${type}\\b([^>]+)>`, 'gi');
		const results: Array<Record<string, string>> = [];
		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			const attrsString = match[1];
			const attrs: Record<string, string> = {};
			const attrRegex = /([a-zA-Z0-9\-:]+)\s*=\s*(["'])(.*?)\2/g;
			let attrMatch;
			while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
				attrs[attrMatch[1]] = attrMatch[3];
			}
			results.push(attrs);
		}

		return results;
	}

	protected extractVideoPosters(html: string): string[] {
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

	protected extractDivHrefs(html: string): string[] {
		const urls: string[] = [];
		const re = /<div[^>]+href="([^"]+)"/g;
		let m: RegExpExecArray | null;
		while ((m = re.exec(html)) !== null) {
			if (m[1]) urls.push(m[1]);
		}
		return [...new Set(urls)];
	}

	protected extractVideoUrls(html: string): string[] {
		const urls: string[] = [];
		const re = /<video[^>]*src="([^"]+)"/g;
		let m: RegExpExecArray | null;
		while ((m = re.exec(html)) !== null) {
			if (m[1].startsWith('http')) urls.push(m[1]);
		}
		return [...new Set(urls)];
	}

	protected extractAllUrls(html: string): string[] {
		return [...html.matchAll(/https?:\/\/[^\s"'<>\\]+/g)].map((m) => m[0]);
	}

	protected extractLinks(html: string): string[] {
		const urls: string[] = [];
		const re = /<link\b[^>]*\brel=(['"])(?:preload|preload\s+stylesheet|stylesheet\s+preload)\1[^>]*\bhref=(['"])([^'"]+)\2[^>]*>/gi;
		let match: RegExpExecArray | null;

		while ((match = re.exec(html)) !== null) {
			if (match[3]) urls.push(match[3]);
		}

		return [...new Set(urls)];
	}

	protected extractMetaDescription(html: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, 'name="description" content="', '"') ||
				this.extractElementText(html, "name='description' content='", "'") ||
				this.extractElementText(html, 'name=description content="', '"')
		);
	}

	protected extractMetaNameContent(html: string, value: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, `name="${value}" content="`, '"') ||
				this.extractElementText(html, `name='${value}' content='`, "'") ||
				this.extractElementText(html, `name=${value} content="`, '"')
		);
	}

	protected extractMetaPropertyContent(html: string, value: string): string {
		return this.decodeHtmlEntities(
			this.extractElementText(html, `property="${value}" content="`, '"') ||
				this.extractElementText(html, `property='${value}' content='`, "'") ||
				this.extractElementText(html, `property=${value} content="`, '"')
		);
	}

	protected collectAnchors(
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

	protected extractMetaKeywords(html: string): string[] {
		const raw =
			this.extractElementText(html, 'name="keywords" content="', '"') ||
			this.extractElementText(html, "name='keywords' content='", "'");
		return raw
			.split(',')
			.map((k) => k.trim())
			.filter(Boolean);
	}

	protected extractTitle(html: string): string {
		return this.decodeHtmlEntities(this.extractElementText(html, '<title>', '</title>'));
	}

	protected resolveUrl(raw: string, base?: string): string | null {
		if (!raw) return null;
		try {
			return new URL(raw, base).toString();
		} catch {
			return null;
		}
	}

	protected decodeHtmlEntities(str: string): string {
		return str
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
			.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
	}

	protected extractByTag(
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

	protected extractOneByTag(html: string, tag: string, options?: { className?: string }): string | null {
		return this.extractByTag(html, tag, options)[0] ?? null;
	}

	protected extractScriptsByType(html: string, type: string): string[] {
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

	protected extractByClass(html: string, className: string): string[] {
		const regex = new RegExp(`<([a-z0-9]+)\\b[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, 'gi');

		const results: string[] = [];
		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			const clean = this.decodeHtmlEntities(match[2].replace(/<[^>]*>/g, '').trim());
			if (clean) results.push(clean);
		}

		return results;
	}

	protected extractAttributes(html: string, tag: string, attr: string): string[] {
		const regex = new RegExp(`<${tag}\\b[^>]*${attr}=["']([^"']+)["']`, 'gi');

		const results: string[] = [];
		let match: RegExpExecArray | null;

		while ((match = regex.exec(html)) !== null) {
			results.push(match[1]);
		}

		return [...new Set(results)];
	}

	protected extractSpans(html: string, className?: string) {
		return this.extractByTag(html, 'span', { className });
	}

	protected extractDivs(html: string, className?: string) {
		return this.extractByTag(html, 'div', { className });
	}

	protected extractAnchorsContent(html: string, className?: string) {
		return this.extractByTag(html, 'a', { className });
	}

	protected extractH2s(html: string, className?: string) {
		return this.extractByTag(html, 'h2', { className });
	}

	protected extractH3s(html: string, className?: string) {
		return this.extractByTag(html, 'h3', { className });
	}

	protected extractLists(html: string, className?: string) {
		return this.extractByTag(html, 'li', { className });
	}

	protected extractBlocks(html: string, tag: string, className?: string): string[] {
		const classPattern = className ? `[^>]*class=["'][^"']*${className}[^"']*["']` : `[^>]*`;

		const regex = new RegExp(`<${tag}\\b${classPattern}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');

		return [...html.matchAll(regex)].map((m) => m[0]);
	}

	protected extractKeyValue(html: string, keyPattern: RegExp, valuePattern: RegExp): Record<string, string> {
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

	protected collectByClassNames(
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
