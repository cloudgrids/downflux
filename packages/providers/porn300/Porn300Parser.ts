import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { Porn300Output } from './Porn300Contracts';

/**
 * Extracts Porn300-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class Porn300Parser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<Porn300Output>>> {
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
