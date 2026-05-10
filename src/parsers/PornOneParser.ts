import { DefaultExtractorResult, PornOneOutput } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class PornOneParser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<PornOneOutput>>> {
		const col = this.collectByClassNames(html, 'md:mb-2 p-1 font-semibold w-[136px] dark:text-white', {
			includeInnerHTML: true
		});

		const cat = this.collectByClassNames(html, 'pt-1 flex flex-wrap leading-none', {
			includeInnerHTML: true
		});

		console.log({ col, cat });

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as PornOneOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornOne, 'PornOneParser', { cause: error });
		}
	}
}
