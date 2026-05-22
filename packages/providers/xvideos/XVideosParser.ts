import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { XVideosOutput, XVideosVideo } from './XVideosContracts';

/**
 * Extracts XVideos-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class XVideosParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XVideosOutput>>> {
		const uploaderHTML = this.collectByClassNames(html, 'main-uploader', { includeInnerHTML: true })?.[0]?.innerHTML;
		const uploader = this.extractAnchors(uploaderHTML, sourceUrl)?.[0]?.split('/')?.pop();

		try {
			return {
				customFields: {
					title: this.extractTitle(html),
					description: this.extractMetaDescription(html),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:duration') || '0', 10),
					videoUrl: this.getVideoUrls(html),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					pageUrl: sourceUrl,
					uploader: uploader ?? 'unknown'
				} as XVideosOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.XVideos, 'XVideosParser', { cause: error });
		}
	}

	private getVideoUrls(html: string): XVideosVideo {
		const src = html ?? '';

		const extract = (fnName: string) => {
			const re = new RegExp(`${fnName}\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'i');
			const m = re.exec(src);
			return m ? m[1] : null;
		};

		const low = extract('setVideoUrlLow') as string;
		const high = extract('setVideoUrlHigh') as string;
		const hls = extract('setVideoHLS') as string;

		return { low, high, hls };
	}
}
