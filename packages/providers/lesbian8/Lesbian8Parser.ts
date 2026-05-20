import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { Lesbian8Output } from './Lesbian8Contracts';

/**
 * Extracts Lesbian8-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class Lesbian8Parser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<Lesbian8Output>>> {
		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl)
				} as Lesbian8Output
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Lesbian8, 'Lesbian8Parser', { cause: error });
		}
	}
}
