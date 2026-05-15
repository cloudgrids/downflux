import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { ZzzTubeOutput } from './ZzzTubeContracts';

export class ZzzTubeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ZzzTubeOutput>>> {
		const video = this.collectElements(html, 'video')?.[0];
		const uploader = this.collectByClassNames(html, 'b-gallery-meta__text link', { includeInnerHTML: true })?.[0];

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videoId: video?.['data-gallery-id'],
					poster: video?.['poster'],
					uploader: uploader?.text ?? 'unknown'
				} as ZzzTubeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.ZzzTube, 'ZzzTubeParser', { cause: error });
		}
	}
}
