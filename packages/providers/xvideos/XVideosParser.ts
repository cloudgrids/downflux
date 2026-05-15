import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { XVideosOutput, XVideosVideo } from './XVideosContracts';

export class XVideosParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<XVideosOutput>>> {
		const uploaderHTML = this.collectByClassNames(html, 'main-uploader', { includeInnerHTML: true })?.[0]?.innerHTML;
		const uploader = this.extractAnchors(uploaderHTML, sourceUrl)?.[0]?.split('/')?.pop();

		try {
			return {
				customFields: {
					title: this.extractTitle(html),
					description: this.extractMetaDescription(html),
					tags: [],
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:duration') || '0', 10),
					videoUrl: this.getVideoUrls(html),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					pageUrl: sourceUrl,
					uploader: uploader ?? 'unknown',
					models: []
				} as XVideosOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.XVideos, 'XVideosParser', { cause: error });
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
