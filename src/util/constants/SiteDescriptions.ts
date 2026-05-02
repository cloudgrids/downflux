import { OkPornParserService } from '../../parsers/OkPornParserService';
import { UrlType } from '../enums';
import { OkPornModelVideoCard, SiteDescriptor } from '../interfaces';

export const SITE_DESCRIPTIONS: SiteDescriptor[] = [
	{
		category: 'okporn',
		pattern: /(?:https?:\/\/)?(?:www\.)?ok\.porn\/(?:albums|video|models)\/([a-zA-Z0-9-]+)/,
		urlType: UrlType.IMAGES,
		transform: ({ html, parser }) => {
			const okPornParser = parser as OkPornParserService;
			return {
				images: [...html.matchAll(/data-original="(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
				title: okPornParser.decodeHtmlEntities(okPornParser.extractTitle(html)),
				customFields: {
					modelName: okPornParser.extractCustomTitle(html).split('/')?.filter(Boolean)?.pop()?.trim() || 'unknown',
					videoAlbumId: html.match(/class="vodeo-gallery"[^>]*href="\/albums\/(\d+)\/"/)?.[1],
					videoCreateDate: okPornParser.extractElementText(html, 'class="date">', '</'),
					starredBy: okPornParser.extractAnchorTextsByHref(html, /^(?:https?:\/\/(?:www\.)?ok\.porn)?\/models\/[^/?#]+\/?$/i),
					videoPoster: html.match(/poster="(https?:\/\/[^"]+)"/)?.[1] || undefined,
					modelVideoCards: okPornParser.extractVideoCards(html) as OkPornModelVideoCard[],
					keywords: okPornParser.extractMetaKeywords(html)
				},
				videoPosters: okPornParser.extractVideoPosters(html),
				description: okPornParser.extractMetaDescription(html),
				keywords: okPornParser.extractMetaKeywords(html)
			};
		}
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
		pattern: /https?:\/\/wallhaven\.cc\/(?:w|user|tag|search)\/([a-zA-Z0-9]+)/,
		urlType: UrlType.IMAGES,
		transform: ({ html, parser }) => parser.transform(html, '')
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
