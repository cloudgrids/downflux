import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { XnXXOutput } from './XnXXContracts';

/**
 * Extracts XnXX-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class XnXXParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XnXXOutput>>> {
		const uploaderHTML = this.collectByClassNames(html, 'main-uploader', { includeInnerHTML: true })?.[0]?.innerHTML;
		const uploader = uploaderHTML ? this.extractAnchors(uploaderHTML, sourceUrl)?.[0]?.split('/')?.pop() : 'unknown';

		try {
			return {
				customFields: {
					title: this.extractTitle(html),
					description: this.extractMetaDescription(html),
					tags: this.extractMetaKeywords(html),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:duration') || '0', 10),
					videoUrl: this.getVideoUrls(html),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					pageUrl: sourceUrl,
					uploader: uploader ?? 'unknown'
				} as XnXXOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.XnXX, 'XnXXParser', { cause: error });
		}
	}

	private getVideoUrls(html: string) {
		const low = this.extractScriptMethodInput('setVideoUrlLow', html);
		const high = this.extractScriptMethodInput('setVideoUrlHigh', html);
		const hls = this.extractScriptMethodInput('setVideoHLS', html);

		return { low, high, hls };
	}
}
