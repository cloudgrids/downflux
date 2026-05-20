import { BaseParser } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { XGroovyOutput } from './XGroovyContracts';

/**
 * Extracts XGroovy-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class XGroovyParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XGroovyOutput>>> {
		try {
			return {
				customFields: {
					videos: { mp4: this.getVideos(html) },
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
				quality: match[3] || VideoQuality.QUnknown
			});
		}

		return videos;
	}
}
