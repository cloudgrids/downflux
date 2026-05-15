import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { ShamelessOutput } from './ShamelessContracts';

export class ShamelessParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ShamelessOutput>>> {
		const flashVars = this.getFlashVars(html);
		const uploaderHTML =
			this.collectByClassNames(html, 'model-subscribe__group', {
				includeInnerHTML: true,
				sourceUrl,
				attributes: ['href']
			})?.[0]?.text ?? 'unknown';

		try {
			return {
				customFields: {
					uploader: uploaderHTML.match(/^[^\n]*/)?.[0] ?? 'unknown',
					videos: { mp4: flashVars?.videos ?? [] },
					pageUrl: sourceUrl,
					poster: flashVars?.previewUrl,
					title: flashVars?.title,
					id: flashVars?.videoId,
					categories: flashVars?.categories,
					tags: flashVars?.tags,
					previews: flashVars?.previews,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as ShamelessOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Shameless, 'ShamelessParser', { cause: error });
		}
	}
}
