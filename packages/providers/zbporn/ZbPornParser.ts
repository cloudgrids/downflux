import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { ZbPornOutput } from './ZbPornContracts';

/**
 * Extracts ZbPorn-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class ZbPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ZbPornOutput>>> {
		const flashVars = this.getFlashVars(html);
		const uploader = this.collectByClassNames(html, 'item-link colored', { includeInnerHTML: true, attributes: ['title'] })?.[0];

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
					uploader: uploader?.text,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens,
					starred: flashVars?.models
				} as ZbPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.ZbPorn, 'ZbPornParser', { cause: error });
		}
	}
}
