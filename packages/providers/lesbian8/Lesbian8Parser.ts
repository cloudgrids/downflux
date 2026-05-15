import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { Lesbian8Output } from './Lesbian8Contracts';

export class Lesbian8Parser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<Lesbian8Output>>> {
		const flashVars = this.getFlashVars(html);

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: flashVars?.videos,
					categories: flashVars?.categories,
					tags: flashVars?.tags,
					id: flashVars?.videoId,
					poster: flashVars?.previewUrl,
					starred: flashVars?.models,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens,
					title: flashVars?.title,
					description: ''
				} as Lesbian8Output
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Lesbian8, 'Lesbian8Parser', { cause: error });
		}
	}
}
