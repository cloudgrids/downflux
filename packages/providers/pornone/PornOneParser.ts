import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { PornOneOutput } from './PornOneContracts';

export class PornOneParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PornOneOutput>>> {
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
					quality:
						this.collectByClassNames(html, 'vjs-tech', { includeInnerHTML: true })?.[0].innerHTML.match(
							/label="([^"]+)"/i
						)?.[1] ?? VideoQuality.QUnknown,
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as PornOneOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornOne, 'PornOneParser', { cause: error });
		}
	}
}
