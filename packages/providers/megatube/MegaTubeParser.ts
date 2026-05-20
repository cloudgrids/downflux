import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { MegaTubeOutput } from './MegaTubeContracts';

/**
 * Extracts MegaTube-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class MegaTubeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MegaTubeOutput>>> {
		const detail = this.collectByClassNames(html, 'video_info-content', { includeInnerHTML: true })?.[0]?.text || 'unknown';

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl),
					uploader: detail?.replace(/\s*Title:.*$/, '')?.trim() || 'Unknown'
				} as MegaTubeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.MegaTube, 'MegaTubeParser', { cause: error });
		}
	}
}
