import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { SxyPornOutput } from './SxyPornContracts';

export class SxyPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SxyPornOutput>>> {
		const uploader = this.collectByClassNames(html, 'pes_author_div pes_edit_div transition', { includeInnerHTML: true });

		console.log({ uploader });
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					description: this.extractMetaPropertyContent(html, 'og:description'),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					title: this.extractMetaPropertyContent(html, 'og:title')
				} as SxyPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SxyPorn, 'SxyPornParser', { cause: error });
		}
	}
}
