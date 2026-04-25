import { UrlType } from '../types';
import { SiteDescriptor } from '../types/SiteDescriptor';

export const SITE_EXTRACTORS: SiteDescriptor[] = [
	{
		category: 'okporn',
		pattern: /(?:https?:\/\/)?(?:www\.)?ok\.porn\/albums\/(\d+)/,
		urlType: UrlType.IMAGES,
		transform: ({ html, parser }) => ({
			images: [...html.matchAll(/data-original="(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
			title: parser.decodeHtmlEntities(parser.extractElementText(html, 'h1 class=title>', '</h1>')),
			customTitle: parser.extractCustomTitle(html),
			description: parser.extractMetaDescription(html),
			keywords: parser.extractMetaKeywords(html)
		})
	},

	{
		category: 'coomer',
		pattern: /https?:\/\/coomer\.(?:st|party)\/([^/]+)\/user\/([^/?#]+)/,
		urlType: UrlType.ANCHORS
	},

	{
		category: 'kemono',
		pattern: /https?:\/\/kemono\.(?:su|party)\/([^/]+)\/user\/([^/?#]+)/,
		urlType: UrlType.ANCHORS
	},

	{
		category: 'wallhaven',
		pattern: /https?:\/\/wallhaven\.cc\/w\/([a-zA-Z0-9]+)/,
		urlType: UrlType.IMAGES,
		transform: ({ html, parser }) => ({
			images: parser.extractImageUrls(html).filter((u) => u.includes('w.wallhaven.cc'))
		})
	},

	{
		category: 'shorts',
		pattern: /https?:\/\/(?:www\.)?shorts\.xxx\/(?:video|embed)\/(\d+)/,
		urlType: UrlType.SOURCES,
		transform: ({ html, parser }) => ({
			sources: parser.extractSourceUrls(html),
			images: parser.extractVideoPosters(html)
		})
	},

	{
		category: 'generic',
		pattern: /^https?:\/\//,
		urlType: UrlType.ANCHORS
	}
];
