import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { DaNudeOutput } from './DaNudeContracts';

export class DaNudeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<DaNudeOutput>>> {
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
					uploader: this.extractSpans(html, 'name')?.[0],
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as DaNudeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.DaNude, 'DaNudeParser', { cause: error });
		}
	}
}
