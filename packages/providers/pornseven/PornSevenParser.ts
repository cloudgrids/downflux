import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider, VideoQuality } from '@types';
import { PornSevenOutput } from './PornSevenContracts';

/**
 * Extracts PornSeven-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class PornSevenParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PornSevenOutput>>> {
		const videoElement = this.collectElements(html, 'video')?.[0];

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					poster: videoElement?.poster,
					videos: videoElement?.src ? { mp4: [{ url: videoElement?.src, quality: VideoQuality.QUnknown }] } : {},
					videoId: videoElement?.['data-id'],
					uploader: videoElement?.['data-source']?.replace(/\./g, '_')
				} as PornSevenOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.PornSeven, 'PornSevenParser', { cause: error });
		}
	}
}
