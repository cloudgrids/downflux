import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { XozillaOutput } from './XozillaContracts';

/**
 * Extracts Xozilla-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class XozillaParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XozillaOutput>>> {
		const uploader = this.extractSpans(html, 'name')?.[0];

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader)
				} as XozillaOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Xozilla, 'XozillaParser', { cause: error });
		}
	}
}
