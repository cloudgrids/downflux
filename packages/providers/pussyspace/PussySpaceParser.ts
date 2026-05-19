import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { PussySpaceOutput } from './PussySpaceContracts';

/**
 * Extracts PussySpace-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class PussySpaceParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PussySpaceOutput>>> {
		const tokenMatch = html.match(/\|sb\|([a-zA-Z0-9_-]+)\|multiShowPlayer\|/);

		const match = html.match(/player\.api\(['"]file['"],['"]([\s\S]*?)['"]\)/s);

		const mp4 = [...(match?.[1].matchAll(/\[(\d+p)](https?:\/\/[^\s,"]+)/g) ?? [])].map(([_, quality, url]) => ({
			quality,
			url
		}));

		try {
			return {
				customFields: {
					videos: { mp4 },
					token: tokenMatch?.[1],
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image')
				} as PussySpaceOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PussySpace, 'PussySpaceParser', { cause: error });
		}
	}
}
