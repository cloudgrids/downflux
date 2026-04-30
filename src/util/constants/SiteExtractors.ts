import { UrlType } from '../enums';
import { OkPornModelVideoCard, SiteDescriptor } from '../interfaces';

export const SITE_EXTRACTORS: SiteDescriptor[] = [
	{
		category: 'okporn',
		pattern: /(?:https?:\/\/)?(?:www\.)?ok\.porn\/(?:albums|video|models)\/([a-zA-Z0-9-]+)/,
		urlType: UrlType.IMAGES,
		transform: ({ html, parser }) => ({
			images: [...html.matchAll(/data-original="(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
			title: parser.decodeHtmlEntities(parser.extractTitle(html)),
			customFields: {
				modelName: parser.extractCustomTitle(html).split('/')?.filter(Boolean)?.pop()?.trim() || 'unknown',
				videoAlbumId: html.match(/class="vodeo-gallery"[^>]*href="\/albums\/(\d+)\/"/)?.[1],
				videoCreateDate: parser.extractElementText(html, 'class="date">', '</'),
				starredBy: parser.extractAnchorTextsByHref(html, /^(?:https?:\/\/(?:www\.)?ok\.porn)?\/models\/[^/?#]+\/?$/i),
				videoPoster: html.match(/poster="(https?:\/\/[^"]+)"/)?.[1] || undefined,
				modelVideoCards: parser.extractVideoCards(html) as OkPornModelVideoCard[],
				keywords: parser.extractMetaKeywords(html)
			},
			videoPosters: parser.extractVideoPosters(html),
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

export function normalizeUrl(url: string): string {
	return url.replace(/(?<=\.\w+)\/$/, '');
}
