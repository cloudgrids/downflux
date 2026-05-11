import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { XHamsterOutput } from './XHamsterContracts';

export class XHamsterParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XHamsterOutput>>> {
		try {
			return {
				customFields: {
					pageUrl: this.extractMetaPropertyContent(html, 'og:url') ?? sourceUrl,
					thumbnailUrl: this.extractMetaPropertyContent(html, 'og:image'),
					username: this.extractSpans(html, 'body-bold-8643e label-5984a label-96c3e')?.[0]?.trim() ?? 'unknown',
					masterPlaylistUrl: this.extractLinks(html)?.find((link) =>
						link.match(/^https:\/\/video-(?:nss|cf)\.xhpingcdn\.com\/.*\.m3u8(?:\?.*)?$/)
					) as string
				}
			};
		} catch {
			throw new GenericException('Unable to parse some fields', ProviderType.XHamster, 'XHamsterProvider');
		}
	}
}
