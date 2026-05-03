import { DefaultExtractorResult, PornHubOutput, PornHubVideo } from '../util';
import { BaseParserService } from './BaseParserService';

export class PornHubParserService extends BaseParserService {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<PornHubOutput>>> {
		return {
			customFields: {
				videoUrl:
					this.extractMetaNameContent(html, 'twitter:url') ?? this.extractMetaNameContent(html, 'og:video:url') ?? sourceUrl,
				videos: this.extractVideoUrlsFromFlashVars(html),
				title: this.extractSpans(html, 'inlineFree')[0] ?? this.extractTitle(html),
				views: parseInt(this.extractSpans(html, 'views')[0]?.replace(/[^0-9]/g, '') ?? '0', 10),
				likes: parseInt(this.extractSpans(html, 'votesUp')[0]?.replace(/[^0-9]/g, '') ?? '0', 10),
				duration: parseInt(this.extractMetaPropertyContent(html, 'video:duration')[0]?.replace(/[^0-9]/g, '') ?? '0', 10),
				thumbnailUrl: this.extractMetaNameContent(html, 'twitter:image') ?? this.extractMetaNameContent(html, 'og:image'),
				user:
					this.collectByClassNames(html, 'userInfoBlock', { includeInnerHTML: true }).map((ht) => {
						const innerText = ht.innerHTML;
						const match = innerText.match(/href="\/model\/([^"]+)"/);
						return match ? match[1] : null;
					})[0] ?? 'pornhub_user',
				totalVideos:
					this.collectByClassNames(html, 'video-actions-container', { includeInnerHTML: true }).find(
						(s) => s.innerHTML.match(/(\d+(?:\.\d+)?)([KMB]?)\s+Videos/)?.[0]
					) ?? '0',
				totalSubscribers:
					this.extractSpans(html)
						.find((s) => s.includes('Subscribers'))
						?.replace(/[^0-9.K]/g, '') ?? '0',

				uploadDate: this.extractDivs(html, 'videoInfo')[0],
				userAvatar: this.extractUserAvatar(html)
			}
		};
	}

	private extractVideoUrlsFromFlashVars(html: string): PornHubVideo[] {
		const key = 'mediaDefinitions';

		const keyIndex = html.indexOf(key);
		if (keyIndex === -1) return [];

		const start = html.indexOf('[', keyIndex);
		if (start === -1) return [];

		let bracketCount = 0;
		let end = start;

		while (end < html.length) {
			if (html[end] === '[') bracketCount++;
			else if (html[end] === ']') bracketCount--;

			end++;

			if (!bracketCount) break;
		}

		const arrayString = html.slice(start, end);

		try {
			return JSON.parse(arrayString);
		} catch (e) {
			console.error('Failed to parse flashvars JSON:', e);
			return [];
		}
	}

	public extractUserAvatar(html: string): string {
		const element = this.extractBlocks(html, 'a', 'userAvatarLink')[0] ?? html;
		return this.extractImageUrls(element)[0] ?? '';
	}
}
