import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { SexVidOutput } from './SexVidContracts';

/**
 * Extracts SexVid-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class SexVidParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SexVidOutput>>> {
		const uploader = this.extractMetaPropertyContent(html, 'og:video:actor');
		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader)
				} as SexVidOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SexVid, 'SexVidParser', { cause: error });
		}
	}
}
