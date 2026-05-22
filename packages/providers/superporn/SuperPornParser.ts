import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider, VideoQuality } from '@types';
import { SuperPornOutput } from './SuperPornContracts';

/**
 * Extracts SuperPorn-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class SuperPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SuperPornOutput>>> {
		const tags = this.collectByClassNames(html, 'chip-link') as Array<{ text: string }>;

		const videoInfo = this.extractScriptsByType(html, 'application/ld+json')?.[0];

		try {
			return {
				customFields: {
					title: videoInfo?.name,
					description: videoInfo?.description,
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					tags: tags.map((tag) => tag.text),
					uploader: videoInfo?.author?.name || 'Unknown',
					width: videoInfo?.width,
					height: videoInfo?.height,
					duration: videoInfo?.duration,
					uploadedAt: videoInfo?.uploadDate,
					quality: videoInfo?.height ? `${videoInfo?.height}p` : VideoQuality.QUnknown
				} as SuperPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.SuperPorn, 'SuperPornParser', { cause: error });
		}
	}
}
