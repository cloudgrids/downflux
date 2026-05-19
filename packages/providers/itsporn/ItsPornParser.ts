import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { ItsPornOutput } from './ItsPornContracts';

export class ItsPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ItsPornOutput>>> {
		const flashVars = this.getFlashVars(html);
		const uploader = this.collectElements(html, 'a')?.[0];

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
					uploader: uploader?.title,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens,
					starred: flashVars?.models
				} as ItsPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.ItsPorn, 'ItsPornParser', { cause: error });
		}
	}
}
