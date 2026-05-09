import { DefaultExtractorResult, PornHubChannelsOutput, PornHubOutput, PornHubVideo } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class PornHubParser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<PornHubOutput>>> {
		try {
			const channels = this.extractChannels(html, sourceUrl);

			return {
				customFields: {
					videoUrl: sourceUrl,
					channels,
					videoMetadata: this.extractVideoUrlsFromFlashVars(html)?.find((video) => video.format === 'mp4'),
					title: this.extractSpans(html, 'inlineFree')[0] ?? this.extractTitle(html),
					views: this.extractSpans(html, 'count')[0]?.match(/(\d+(?:\.\d+)?)([KMB]?)/g)?.[0] ?? '0',
					likes: this.extractSpans(html, 'votesUp')[0]?.match(/(\d+(?:\.\d+)?)([KMB]?)/g)?.[0] ?? '0',
					duration: this.extractMetaPropertyContent(html, 'video:duration') ?? '0',
					thumbnailUrl: this.extractMetaNameContent(html, 'twitter:image') ?? this.extractMetaNameContent(html, 'og:image'),
					user:
						this.collectByClassNames(html, 'userInfoBlock', { includeInnerHTML: true })[0]?.innerHTML?.match(
							/href="\/(?:model|channel|pornstar|users)\/([^"]+)"/
						)?.[1] ?? 'pornhub_user',
					totalVideos: this.extractUserStat(html, 'Videos'),
					totalSubscribers: this.extractUserStat(html, 'Subscribers'),

					uploadDate: this.extractDivs(html, 'videoInfo')[0],
					userAvatar: this.extractUserAvatar(html),
					currentPage: new URL(sourceUrl)?.searchParams?.get('page') ?? '1'
				}
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornHub, 'PornHubParser', { cause: error });
		}
	}

	private extractChannels(html: string, sourceUrl: string): PornHubChannelsOutput[] {
		const blocks: string[] = [];
		const divPattern = /<div\b[^>]*class=["']([^"']*)["'][^>]*>/gi;
		let match: RegExpExecArray | null;

		while ((match = divPattern.exec(html)) !== null) {
			const classes = (match[1] ?? '').split(/\s+/).filter(Boolean);
			if (!classes.includes('channelsWrapper') || !classes.includes('clearfix')) continue;
			blocks.push(this.extractBalancedDiv(html, match.index));
		}

		const toInt = (value?: string): number => {
			const parsed = parseInt((value ?? '0').replace(/[^\d]/g, ''), 10);
			return Number.isFinite(parsed) ? parsed : 0;
		};

		const stripTags = (value?: string): string => this.decodeHtmlEntities((value ?? '').replace(/<[^>]*>/g, '').trim());

		const extractStat = (channelHtml: string, labelPattern: string): number => {
			const pattern = new RegExp(`<li[^>]*>\\s*${labelPattern}\\s*<span>([\\s\\S]*?)<\\/span>`, 'i');
			const matched = channelHtml.match(pattern)?.[1];
			return toInt(stripTags(matched));
		};

		return blocks.map((channelHtml) => {
			const relativeChannelUrl =
				channelHtml.match(/href=["'](\/channels\/[^"']+)["']/i)?.[1] ?? channelHtml.match(/href=["']([^"']+)["']/i)?.[1] ?? '';
			const channelUrl = this.resolveUrl(relativeChannelUrl, sourceUrl) ?? relativeChannelUrl;

			const nameFromClass = stripTags(
				channelHtml.match(/<a[^>]*class=["'][^"']*\busernameLink\b[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)?.[1]
			);
			const slug = (channelUrl.split('/').pop() ?? '').replace(/[-_]+/g, ' ').trim();

			const thumbnailRaw =
				channelHtml.match(/<img[^>]*\bsrc=["']([^"']+)["'][^>]*>/i)?.[1] ??
				channelHtml.match(/<img[^>]*\bdata-src=["']([^"']+)["'][^>]*>/i)?.[1] ??
				'';
			const channelThumbnail = this.resolveUrl(thumbnailRaw, sourceUrl) ?? thumbnailRaw;

			const rankText = stripTags(channelHtml.match(/<div[^>]*class=["'][^"']*\brank\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]);

			return {
				channelName: (nameFromClass || slug).toUpperCase(),
				subscribers: extractStat(channelHtml, 'Subscribers'),
				videos: extractStat(channelHtml, 'Videos'),
				videosViews: extractStat(channelHtml, 'Videos\\s*Views'),
				channelThumbnail,
				channelUrl,
				rank: toInt(rankText),
				isAwarded: /channelAward|award/i.test(channelHtml)
			};
		});
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
