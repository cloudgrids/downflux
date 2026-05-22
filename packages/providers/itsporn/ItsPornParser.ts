import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { ItsPornOutput } from './ItsPornContracts';

/**
 * Extracts ItsPorn-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class ItsPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ItsPornOutput>>> {
		const uploader = this.collectElements(html, 'a')?.[0];

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader?.title)
				} as ItsPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.ItsPorn, 'ItsPornParser', { cause: error });
		}
	}
}
