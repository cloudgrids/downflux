import { BaseParser } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { XGroovyOutput } from './XGroovyContracts';

export class XGroovyParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XGroovyOutput>>> {
		try {
			return {
				customFields: {
					videos: this.getVideos(html),
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as XGroovyOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.XGroovy, 'XGroovyParser', { cause: error });
		}
	}

	private getVideos(html: string): VideoSourceOutput[] {
		const videos: VideoSourceOutput[] = [];
		const sourceRegex = /<source\s+[^>]*src="([^"]+)"[^>]*type="([^"]+)"[^>]*title="([^"]+)"[^>]*>/gi;
		let match;

		while ((match = sourceRegex.exec(html)) !== null) {
			videos.push({
				url: match[1],
				quality: match[3]
			});
		}

		return videos;
	}
}
