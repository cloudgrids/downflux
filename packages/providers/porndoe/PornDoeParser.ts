import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { PornDoeOutput } from './PornDoeContracts';

/**
 * Extracts PornDoe-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
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
					title: this.extractMetaPropertyContent(html, 'og:title')
				} as PornDoeOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornDoe, 'PornDoeParser', { cause: error });
		}
	}
}
