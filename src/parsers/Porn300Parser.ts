import { DefaultExtractorResult, Porn300Output } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class Porn300Parser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<Porn300Output>>> {
		try {
			return {
				customFields: {
					description: this.extractMetaPropertyContent(html, 'og:description'),
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as Porn300Output
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Porn300, 'Porn300Parser', { cause: error });
		}
	}
}
