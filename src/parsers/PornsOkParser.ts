import { DefaultExtractorResult, PornsOkOutput } from '@app/contracts';
import { GenericException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';

export class PornsOkParser extends DefaultParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult<Partial<PornsOkOutput>>> {
		try {
			return {
				customFields: {
					title: this.extractTitle(html)?.split('.')?.[0],
					pageUrl: sourceUrl,
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:duration') || '0', 10),
					uploadedAt: this.extractMetaPropertyContent(html, 'ya:ovs:upload_date'),
					totalViews: parseInt(this.extractMetaPropertyContent(html, 'ya:ovs:views_total') || '0', 10),
					type: this.extractMetaPropertyContent(html, 'og:video:type'),
					videoUrl: this.extractMetaPropertyContent(html, 'ya:ovs:content_url'),
					starredBy:
						this.collectByClassNames(html, 'cat-link pstar', { includeInnerHTML: true })?.map((el) => el?.innerHTML) ?? [],
					categories: this.collectByClassNames(html, 'cat-link', { includeInnerHTML: true })?.map((el) => el?.innerHTML) ?? []
				}
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornsOk, 'PornsOkParser', { cause: error });
		}
	}
}
