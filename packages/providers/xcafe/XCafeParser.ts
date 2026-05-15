import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { XCafeOutput } from './XCafeContracts';

export class XCafeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XCafeOutput>>> {
		const source = this.collectElements(html, 'source')?.[0];
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: [{ url: source?.src, quality: VideoQuality.QUnknown }],
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as XCafeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.XCafe, 'XCafeParser', { cause: error });
		}
	}
}
