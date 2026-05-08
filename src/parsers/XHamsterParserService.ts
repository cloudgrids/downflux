import { GenericException } from '../exceptions';
import { DefaultExtractorResult, ServiceType, XHamsterOutput } from '../util';
import { BaseParserService } from './BaseParserService';

export class XHamsterParserService extends BaseParserService {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<XHamsterOutput>>> {
		try {
			return {
				customFields: {
					pageUrl: this.extractMetaPropertyContent(html, 'og:url') ?? sourceUrl,
					thumbnailUrl: this.extractMetaPropertyContent(html, 'og:image'),
					username: this.extractSpans(html, 'body-bold-8643e label-5984a label-96c3e')?.[0]?.trim() ?? 'unknown'
				} as Partial<XHamsterOutput>
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields', ServiceType.XHamster, 'XHamsterService', { cause: error });
		}
	}
}
