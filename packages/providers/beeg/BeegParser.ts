import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { BeegOutput } from './BeegContracts';

/**
 * Extracts Beeg-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class BeegParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<BeegOutput>>> {
		try {
			return {
				customFields: {
					username:
						this.extractAnchorsContent(html, 'tw-text-title-16 tw-text-body-clear tw-overflow-hidden tw-text-ellipsis')?.[0] ??
						'beeg_user',
					pageUrl: sourceUrl
				} as BeegOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Beeg, 'BeegParser', { cause: error });
		}
	}
}
