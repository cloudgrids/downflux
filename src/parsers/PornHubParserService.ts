import { DefaultExtractorResult, PornHubOutput, PornHubVideo } from '../util';
import { BaseParserService } from './BaseParserService';

export class PornHubParserService extends BaseParserService {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<PornHubOutput>>> {
		return {
			customFields: {
				videoUrl: sourceUrl,
				videos: this.extractVideoUrlsFromFlashVars(html),
				title: this.extractSpans(html, 'inlineFree')[0] ?? this.extractTitle(html),
				views: this.extractSpans(html, 'count')[0]?.match(/(\d+(?:\.\d+)?)([KMB]?)/g)?.[0] ?? '0',
				likes: this.extractSpans(html, 'votesUp')[0]?.match(/(\d+(?:\.\d+)?)([KMB]?)/g)?.[0] ?? '0',
				duration: this.extractMetaPropertyContent(html, 'video:duration') ?? '0',
				thumbnailUrl: this.extractMetaNameContent(html, 'twitter:image') ?? this.extractMetaNameContent(html, 'og:image'),
				user:
					this.collectByClassNames(html, 'userInfoBlock', { includeInnerHTML: true }).map((ht) => {
						const innerText = ht.innerHTML;
						const match = innerText.match(/href="\/model\/([^"]+)"/);
						return match ? match[1] : null;
					})[0] ?? 'pornhub_user',
				totalVideos: this.extractUserStat(html, 'Videos'),
				totalSubscribers: this.extractUserStat(html, 'Subscribers'),

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

	private extractUserStat(html: string, label: string): string {
		const userRowHtml = this.extractUserRowHtml(html);
		const statText = this.extractSpans(userRowHtml).find((spanText) => new RegExp(`\\b${label}\\b`, 'i').test(spanText)) ?? '';
		const match = statText.match(/(\d+(?:\.\d+)?[KMB]?)/i);
		return match?.[1] ?? '0';
	}

	private extractUserRowHtml(html: string): string {
		const divPattern = /<div\b[^>]*class=["']([^"']*)["'][^>]*>/gi;
		let match: RegExpExecArray | null;

		while ((match = divPattern.exec(html)) !== null) {
			const classes = match[1].split(/\s+/);
			if (!classes.includes('video-info-row') || !classes.includes('userRow')) continue;

			return this.extractBalancedDiv(html, match.index);
		}

		return '';
	}

	private extractBalancedDiv(html: string, startIndex: number): string {
		const divPattern = /<\/?div\b[^>]*>/gi;
		divPattern.lastIndex = startIndex;

		let depth = 0;
		let match: RegExpExecArray | null;

		while ((match = divPattern.exec(html)) !== null) {
			if (match[0].startsWith('</')) depth--;
			else depth++;

			if (depth === 0) return html.slice(startIndex, divPattern.lastIndex);
		}

		return html.slice(startIndex);
	}
}
