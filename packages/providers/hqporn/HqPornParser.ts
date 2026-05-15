import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { HqPornOutput } from './HqPornContracts';

export class HqPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<HqPornOutput>>> {
		try {
			return {
				customFields: {
					title: this.extractTitle(html)
						?.replace(/\\[nrtbvf0\\'""`]/g, '')
						?.trim(),
					poster: this.extractVideoPosters(html)?.[0],
					pageUrl: sourceUrl,
					videos: {
						mp4: this.extractSourceUrls(html)?.map((url) => ({ url, quality: VideoQuality.QUnknown }))
					}
				}
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.HqPorn, 'HqPornParser', { cause: error });
		}
	}
}
