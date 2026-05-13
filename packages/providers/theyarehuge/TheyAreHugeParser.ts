import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { TheyAreHugeOutput } from './TheyAreHugeContracts';

export class TheyAreHugeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TheyAreHugeOutput>>> {
		const flashVars = this.getFlashVars(html);
		try {
			return {
				customFields: {
					models: flashVars.models,
					videoId: flashVars.videoId,
					pageUrl: sourceUrl,
					poster: flashVars.previewUrl,
					tags: flashVars.tags,
					title: flashVars.title,
					videos: [
						{ url: flashVars.videoUrl, quality: VideoQuality.Q240 },
						{ url: flashVars.videoAltUrl, quality: VideoQuality.Q480 }
					]
				} as TheyAreHugeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.TheyAreHuge, 'TheyAreHugeParser', { cause: error });
		}
	}
}
