import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { EpicGfsOutput } from './EpicGfsContracts';

/**
 * Extracts EpicGfs-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class EpicGfsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<EpicGfsOutput>>> {
		const uploader = this.extractSpans(html, 'name')?.[0];
		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader)
				} as EpicGfsOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.EpicGfs, 'EpicGfsParser', { cause: error });
		}
	}
}
