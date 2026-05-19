import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { DaFreePornOutput } from './DaFreePornContracts';

export class DaFreePornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<DaFreePornOutput>>> {
		const flashVars = this.getFlashVars(html);

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: {
						mp4: flashVars?.videos
					},
					title: flashVars?.title,
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					videoId: flashVars?.videoId,
					previews: flashVars?.previews,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as DaFreePornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.DaFreePorn, 'DaFreePornParser', { cause: error });
		}
	}
}
