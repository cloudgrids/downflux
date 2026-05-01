import { UrlType } from '../enums';
import { OkPornModelVideoCard, SiteDescriptor, WallHavenWallPaperOutput } from '../interfaces';

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
		pattern: /https?:\/\/wallhaven\.cc\/(?:w|user|tag|search)\/([a-zA-Z0-9]+)/,
		urlType: UrlType.IMAGES,
		transform: ({ html, parser }) => {
			const descriptionParts = parser.extractMetaDescription(html)?.split('|');
			const description = descriptionParts?.[0]?.trim();
			const tags = description?.split(',').map((s) => s?.trim()) ?? [];
			const resolution = descriptionParts?.[1]?.trim()?.split(' ')[0];
			const [dimensionX, dimensionY] = resolution?.split('x')?.map((a) => Number(a)) ?? [];
			const uploader = description.split("'")[0];

			return {
				description,
				customFields: {
					resolution,
					tags,
					uploader,
					totalContents: parser.extractElementText(html, 'class="far fa-fw fa-gap fa-images"></i>', '</'),
					dimensionX,
					dimensionY,
					ratio: dimensionX && dimensionY ? (dimensionY / dimensionX).toFixed(2) : '0.00',
					...parser.extractDefinitionList(html)
				} as Partial<WallHavenWallPaperOutput>
			};
		}
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
