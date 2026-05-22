import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider, VideoQuality } from '@types';
import { XCafeOutput } from './XCafeContracts';

/**
 * Extracts XCafe-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class XCafeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XCafeOutput>>> {
		const source = this.collectElements(html, 'source')?.[0];
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: { mp4: [{ url: source?.src, quality: VideoQuality.QUnknown }] },
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as XCafeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.XCafe, 'XCafeParser', { cause: error });
		}
	}
}
