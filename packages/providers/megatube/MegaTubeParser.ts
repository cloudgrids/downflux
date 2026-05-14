import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { MegaTubeOutput } from './MegaTubeContracts';

export class MegaTubeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MegaTubeOutput>>> {
		const flashVars = this.getFlashVars(html);

		const detail = this.collectByClassNames(html, 'video_info-content', { includeInnerHTML: true })?.[0]?.text || 'unknown';

		const videoUrl =
			flashVars.videoUrl && flashVars.licenseCode
				? this.kvsResolver.resolveKvsUrl(flashVars.videoUrl, flashVars.licenseCode)
				: flashVars.videoUrl;

		console.log({ flashVars, detail, videoUrl });

		try {
			return {
				customFields: {
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					videos: [{ url: videoUrl, quality: VideoQuality.QUnknown }],
					pageUrl: sourceUrl,
					videoId: flashVars.videoId,
					uploader: detail?.replace(/\s*Title:.*$/, '')?.trim() || 'Unknown'
				} as MegaTubeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.MegaTube, 'MegaTubeParser', { cause: error });
		}
	}
}
