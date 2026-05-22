import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { DaFreePornOutput } from './DaFreePornContracts';

/**
 * Extracts DaFreePorn-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class DaFreePornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<DaFreePornOutput>>> {
		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl)
				} as DaFreePornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.DaFreePorn, 'DaFreePornParser', { cause: error });
		}
	}
}
