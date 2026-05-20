import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { XDeguOutput } from './XDeguContracts';

/**
 * Extracts XDegu-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class XDeguParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XDeguOutput>>> {
		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl)
				} as XDeguOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.XDegu, 'XDeguParser', { cause: error });
		}
	}
}
