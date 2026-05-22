import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { ShamelessOutput } from './ShamelessContracts';

/**
 * Extracts Shameless-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class ShamelessParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ShamelessOutput>>> {
		const uploaderHTML =
			this.collectByClassNames(html, 'model-subscribe__group', {
				includeInnerHTML: true,
				sourceUrl,
				attributes: ['href']
			})?.[0]?.text ?? 'unknown';

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl),
					uploader: uploaderHTML.match(/^[^\n]*/)?.[0] ?? 'unknown'
				} as ShamelessOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Shameless, 'ShamelessParser', { cause: error });
		}
	}
}
