import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { EPornerOutput } from './EPornerContracts';

export class EPornerParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<EPornerOutput>>> {
		const hash = html.match(/EP\.video\.player\.hash\s*=\s*['"](.*?)['"]/)?.[1];
		const videoId = html.match(/EP\.video\.player\.vid\s*=\s*['"](.*?)['"]/)?.[1];
		const uploader = this.collectByClassNames(html, 'vit-uploader', { includeInnerHTML: true })?.[0]?.text;

		try {
			return {
				customFields: {
					videoId,
					uploader: uploader ?? 'unknown',
					hash: hash ? hash.replace(/\$/, '') : '',
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as EPornerOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.EPorner, 'EPornerParser', { cause: error });
		}
	}
}
