import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { SexVidOutput } from './SexVidContracts';

export class SexVidParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SexVidOutput>>> {
		const flashVars = this.getFlashVars(html);

		try {
			return {
				customFields: {
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					actor: this.extractMetaPropertyContent(html, 'og:video:actor'),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:video:duration') ?? '0', 10),
					releasedAt: this.extractMetaPropertyContent(html, 'og:video:release_date'),
					pageUrl: sourceUrl,
					videos: flashVars?.videos
				} as SexVidOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SexVid, 'SexVidParser', { cause: error });
		}
	}
}
