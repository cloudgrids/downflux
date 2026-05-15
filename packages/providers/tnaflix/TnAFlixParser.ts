import { BaseParser } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { TnAFlixOutput } from './TnAFlixContracts';

export class TnAFlixParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TnAFlixOutput>>> {
		const [disLikes, likes] = this.extractSpans(html, 'thumb-count') ?? ['0', '0'];
		return {
			customFields: {
				disLikes: parseInt(disLikes),
				likes: parseInt(likes),
				pageUrl: sourceUrl,
				title: this.extractTitle(html),
				description: '',
				uploader:
					this.extractAnchors(html)
						.find((url) => url.includes('/profile'))
						?.match(/profile\/([^/]+)/)?.[1] ?? 'unknown',
				videoId: sourceUrl.match(/\/video(\d+)/i)?.[1] ?? 'unknown',
				poster: this.extractMetaPropertyContent(html, 'og:image'),
				videos: {
					mp4: this.getVideos(html)
				},
				tags: []
			} as TnAFlixOutput
		};
	}

	private getVideos(html: string): VideoSourceOutput[] {
		const videos: VideoSourceOutput[] = [];
		const sourceRegex = /<source\s+[^>]*src="([^"]+)"[^>]*type="[^"]+"[^>]*size="([^"]+)"[^>]*>/g;
		let match;

		while ((match = sourceRegex.exec(html)) !== null) {
			videos.push({
				url: match[1],
				quality: `${match[2]}p` as VideoQuality
			});
		}

		return videos;
	}
}
