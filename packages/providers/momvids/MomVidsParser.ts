import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { MomVidsOutput } from './MomVidsContracts';

/**
 * Extracts MomVids-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class MomVidsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MomVidsOutput>>> {
		const uploader = this.extractAnchorTextsByHref(html, /\/members\//)?.[0];

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader)
				} as MomVidsOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.MomVids, 'MomVidsParser', { cause: error });
		}
	}
}
