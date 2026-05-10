import { DefaultExtractorResult, XVideosOutput } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class XVideosParser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<XVideosOutput>>> {
		const uploaderHTML = this.collectByClassNames(html, 'main-uploader', { includeInnerHTML: true })?.[0]?.innerHTML;
		const uploader = this.extractAnchors(uploaderHTML, sourceUrl)?.[0]?.split('/')?.pop();

		try {
			return {
				customFields: {
					title: this.extractTitle(html),
					description: this.extractMetaDescription(html),
					keywords: this.extractMetaKeywords(html),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:duration') || '0', 10),
					videoUrl: JSON.parse(this.extractScriptsByType(html, 'application/ld+json')?.[0] ?? `{}`)?.contentUrl,
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
}
