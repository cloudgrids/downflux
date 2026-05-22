import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { AnalRzOutput } from './AnalRzContracts';

/**
 * Extracts AnalRz-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 * Handles extraction of video metadata from JSON-LD structured data and HTML elements.
 */
export class AnalRzParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<AnalRzOutput>>> {
		const script = this.extractScriptsByType(html, 'application/ld+json', 'VideoObject')?.[0];
		const actors = script?.actor?.map((a) => a?.name);

		try {
			return {
				customFields: {
					videoId: sourceUrl.match(/\/video\/(\d+)\//)?.[1] ?? 'unknown_id',
					pageUrl: sourceUrl,
					description: script?.description,
					tags: script?.keywords,
					title: script?.name,
					actors,
					width: this.extractMetaPropertyContent(html, 'og:video:width'),
					height: this.extractMetaPropertyContent(html, 'og:video:height'),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					uploader: actors?.join('_')
				} as AnalRzOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.AnalRz, 'AnalRzParser', { cause: error });
		}
	}
}
