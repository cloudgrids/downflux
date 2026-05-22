import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { BlackPornOutput } from './BlackPornContracts';

/**
 * Extracts BlackPorn-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 * Handles extraction of video metadata from HTML elements and structured data.
 */
export class BlackPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<BlackPornOutput>>> {
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videoId: sourceUrl.match(/\/video\/(\d+)\//)?.[1] ?? 'unknown_id',
					uploader: this.extractAnchorTextsByHref(html, /\/members\//)?.[0] ?? 'Unknown Uploader',
					poster: this.extractScriptsByType(html, 'application/ld+json', 'VideoObject')?.[0]?.thumbnailUrl
				} as BlackPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.BlackPorn, 'BlackPornParser', { cause: error });
		}
	}
}
