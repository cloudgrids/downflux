import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { InterracialOutput } from './InterracialContracts';

/**
 * Extracts Interracial-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
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
