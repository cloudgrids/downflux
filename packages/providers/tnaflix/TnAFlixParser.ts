import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TnAFlixOutput, TnAFlixVideo } from './TnAFlixContracts';

export class TnAFlixParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TnAFlixOutput>>> {
		const [disLikes, likes] = this.extractSpans(html, 'thumb-count') ?? ['0', '0'];
		return {
			customFields: {
				disLikes: parseInt(disLikes),
				likes: parseInt(likes),
				pageUrl: sourceUrl,
				title: this.extractTitle(html),
				uploader: this.extractAnchors(html).find((url) => url.includes('/profile')) ?? 'unknown',
				videoId: sourceUrl.split('/').pop(),
				videoPoster: this.extractMetaPropertyContent(html, 'og:image'),
				videos: this.getVideos(html),
				videoTags: []
			} as TnAFlixOutput
		};
	}

	private getVideos(html: string): TnAFlixVideo[] {
		const videos: TnAFlixVideo[] = [];
		const sourceRegex = /<source\s+[^>]*src="([^"]+)"[^>]*type="([^"]+)"[^>]*size="([^"]+)"[^>]*>/g;
		let match;

		while ((match = sourceRegex.exec(html)) !== null) {
			videos.push({
				url: match[1],
				type: match[2],
				quality: match[3]
			});
		}

		return videos;
	}
}
