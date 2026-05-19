import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { MomVidsOutput } from './MomVidsContracts';

export class MomVidsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MomVidsOutput>>> {
		const flashVars = this.getFlashVars(html);
		const uploader = this.extractAnchorTextsByHref(html, /\/members\//)?.[0];

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: {
						mp4: flashVars?.videos
					},
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					videoId: flashVars?.videoId,
					previews: flashVars?.previews,
					uploader: uploader,
					starred: flashVars?.models,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as MomVidsOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.MomVids, 'MomVidsParser', { cause: error });
		}
	}
}
