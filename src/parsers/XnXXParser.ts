import { DefaultExtractorResult, XnXXOutput } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class XnXXParser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<XnXXOutput>>> {
		const uploaderHTML = this.collectByClassNames(html, 'main-uploader', { includeInnerHTML: true })?.[0]?.innerHTML;
		const uploader = uploaderHTML ? this.extractAnchors(uploaderHTML, sourceUrl)?.[0]?.split('/')?.pop() : 'unknown';

		console.log(this.getVideoUrls(html));

		try {
			return {
				customFields: {
					title: this.extractTitle(html),
					description: this.extractMetaDescription(html),
					keywords: this.extractMetaKeywords(html),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:duration') || '0', 10),
					videoUrl: this.getVideoUrls(html),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					pageUrl: sourceUrl,
					uploader: uploader ?? 'unknown',
					models: []
				} as XnXXOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.XnXX, 'XnXXParser', { cause: error });
		}
	}

	private getVideoUrls(html: string) {
		const src = html ?? '';

		const extract = (fnName: string) => {
			const re = new RegExp(`${fnName}\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'i');
			const m = re.exec(src);
			return m ? m[1] : null;
		};

		const low = extract('setVideoUrlLow');
		const high = extract('setVideoUrlHigh');
		const hls = extract('setVideoHLS');

		return { low, high, hls };
	}
}
