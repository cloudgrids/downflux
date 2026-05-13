import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { SuperPornOutput } from './SuperPornContracts';

export class SuperPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SuperPornOutput>>> {
		const uploader = this.collectByClassNames(html, 'info-uploader') as Array<{ text: string }>;
		const tags = this.collectByClassNames(html, 'chip-link') as Array<{ text: string }>;
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					tags: tags.map((tag) => tag.text),
					uploader: uploader.map((uploader) => uploader.text)?.[0]
				} as SuperPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SuperPorn, 'SuperPornParser', { cause: error });
		}
	}
}
