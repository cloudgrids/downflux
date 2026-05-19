import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { PornsOkOutput } from './PornsOkContracts';

/**
 * Extracts PornsOk-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class PornsOkParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PornsOkOutput>>> {
		const videoUrl = this.extractMetaPropertyContent(html, 'ya:ovs:content_url');
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
					videos: { mp4: [{ url: videoUrl, quality: VideoQuality.QUnknown }] },
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
