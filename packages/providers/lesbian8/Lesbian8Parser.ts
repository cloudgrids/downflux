import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { Lesbian8Output } from './Lesbian8Contracts';

export class Lesbian8Parser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<Lesbian8Output>>> {
		const flashVars = this.getFlashVars(html);

		const videoUrl =
			flashVars?.videoUrl && flashVars.licenseCode
				? this.kvsResolver.resolveKvsUrl(flashVars.videoUrl, flashVars.licenseCode)
				: flashVars.videoUrl;
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: videoUrl ? [{ url: videoUrl, quality: VideoQuality.QUnknown }] : [],
					categories: flashVars?.categories,
					tags: flashVars?.tags,
					id: flashVars?.videoId,
					poster: flashVars?.previewUrl,
					starred: flashVars?.models,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: Array.from({ length: flashVars?.timelineScreenCount ?? 0 }, (_, i) =>
						flashVars?.timelineScreenUrl ? flashVars.timelineScreenUrl.replace('{time}', (i + 1).toString()) : undefined
					),
					title: flashVars?.title
				} as Lesbian8Output
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Lesbian8, 'Lesbian8Parser', { cause: error });
		}
	}
}
