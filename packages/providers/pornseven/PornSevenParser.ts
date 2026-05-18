import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { PornSevenOutput } from './PornSevenContracts';

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
			throw new GenericException('Unable to parse some fields:', ProviderType.PornSeven, 'PornSevenParser', { cause: error });
		}
	}
}
