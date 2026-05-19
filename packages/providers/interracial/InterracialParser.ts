import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { InterracialOutput } from './InterracialContracts';

export class InterracialParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<InterracialOutput>>> {
		const flashVars = this.getFlashVars(html);

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
					starred: flashVars?.models,
					uploader: this.extractAnchorTextsByHref(html, /\/members\//)?.[0],
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as InterracialOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Interracial, 'InterracialParser', { cause: error });
		}
	}
}
