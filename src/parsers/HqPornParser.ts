import { DefaultExtractorResult, HqPornOutput } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class HqPornParser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<HqPornOutput>>> {
		try {
			return {
				customFields: {
					title: this.extractTitle(html)
						?.replace(/\\[nrtbvf0\\'""`]/g, '')
						?.trim(),
					poster: this.extractVideoPosters(html)?.[0],
					pageUrl: sourceUrl,
					videoUrl: this.extractSourceUrls(html)?.[0],
					videoTags: this.extractMetaKeywords(html) ?? []
				}
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.HqPorn, 'HqPornParser', { cause: error });
		}
	}
}
