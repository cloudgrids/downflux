import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { InterracialOutput } from './InterracialContracts';

/**
 * Extracts Interracial-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class InterracialParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<InterracialOutput>>> {
		const uploader = this.extractAnchorTextsByHref(html, /\/members\//)?.[0];

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader)
				} as InterracialOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.Interracial, 'InterracialParser', { cause: error });
		}
	}
}
