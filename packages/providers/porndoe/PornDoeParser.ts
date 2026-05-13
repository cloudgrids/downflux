import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { PornDoeOutput } from './PornDoeContracts';

export class PornDoeParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PornDoeOutput>>> {
		const variablesMatch = html.match(/window\.variables\s*=\s*({[\s\S]*?});/);

		const variables = variablesMatch ? JSON.parse(variablesMatch[1]) : null;
		const banners = variables?.banners;

		const uploader = this.extractAnchorsContent(html, 'vpc-title');

		try {
			return {
				customFields: {
					banners,
					uploader: uploader?.[0],
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					title: this.extractMetaPropertyContent(html, 'og:title')
				} as PornDoeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornDoe, 'PornDoeParser', { cause: error });
		}
	}
}
