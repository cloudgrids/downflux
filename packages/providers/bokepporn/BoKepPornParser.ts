import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { BoKepPornOutput } from './BoKepPornContracts';

/**
 * Extracts BoKepPorn-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class BoKepPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<BoKepPornOutput>>> {
		const uploader = this.collectByClassNames(html, 'user-weeks-block__title username', { includeInnerHTML: true })?.[0];
		const starred = this.collectByClassNames(html, 'row-categories__link hoverRed', { includeInnerHTML: true });

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader, starred)
				} as BoKepPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.BoKepPorn, 'BoKepPornParser', { cause: error });
		}
	}
}
