import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { EpicGfsOutput } from './EpicGfsContracts';

export class EpicGfsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<EpicGfsOutput>>> {
		const flashVars = this.getFlashVars(html);
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: {
						mp4: flashVars.videos
					},
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					videoId: flashVars.videoId,
					uploader: this.extractSpans(html, 'name')?.[0],
					previews: flashVars.previews,
					timelineScreenCount: flashVars.timelineScreenCount,
					timelineScreens: flashVars.timelineScreens
				} as EpicGfsOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.EpicGfs, 'EpicGfsParser', { cause: error });
		}
	}
}
