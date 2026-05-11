import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { OkPornModelVideoCard, OkPornOutput } from './OkPornContracts';

export class OkPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<OkPornOutput>>> {
		try {
			return {
				images: this.extractAttributes(html, 'img', 'data-original'),
				title: this.decodeHtmlEntities(this.extractTitle(html)),
				customFields: {
					modelName: this.extractCustomTitle(html).split('/').filter(Boolean).pop()?.trim() || 'unknown',
					starredModels: this.extractStarredModels(html).map((m) => m.name) ?? [],
					videoAlbumId: this.extractAttributes(html, 'a', 'href')
						.find((h) => /\/albums\/\d+\//.test(h))
						?.match(/\/albums\/(\d+)\//)?.[1],
					videoCreatedAt: this.extractSpans(html, 'date')[0],
					starredBy: this.extractAnchorTextsByHref(html, /^(?:https?:\/\/(?:www\.)?ok\.porn)?\/models\/[^/?#]+\/?$/i) ?? [],
					videoPoster: this.extractVideoPosters(html)[0],
					videoCards: this.extractVideoCards(html) ?? []
				},
				videoPosters: this.extractVideoPosters(html),
				description: this.extractMetaDescription(html),
				keywords: this.extractMetaKeywords(html),
				sourceUrl
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.OkPorn, 'OkPornParser', { cause: error });
		}
	}

	public extractVideoCards(html: string, sourceUrl?: string): OkPornModelVideoCard[] {
		const anchors = this.extractBlocks(html, 'a');

		return anchors
			.map((block) => {
				const preview = /data-preview-custom="([^"]+)"/i.exec(block)?.[1];
				if (!preview) return null;

				const href = /href="([^"]+)"/i.exec(block)?.[1];
				const title = /title="([^"]+)"/i.exec(block)?.[1];

				const img = this.extractAttributes(block, 'img', 'data-original')[0] || this.extractAttributes(block, 'img', 'src')[0];

				const duration = this.extractSpans(block, 'duration_item')[0];

				const videoUrl = this.resolveUrl(href ?? '', sourceUrl) ?? href ?? '';

				return {
					videoId: videoUrl.split('/').filter(Boolean).pop() ?? '',
					customTitle: title ? this.decodeHtmlEntities(title) : '',
					preview: this.resolveUrl(preview, sourceUrl) ?? preview,
					screenShot: this.resolveUrl(img, sourceUrl) ?? img,
					duration: duration ?? ''
				};
			})
			.filter(Boolean) as OkPornModelVideoCard[];
	}

	public extractCustomTitle(html: string): string {
		return this.extractElementText(html, 'class="item" href="', '"');
	}

	public extractStarredModels(html: string, sourceUrl?: string) {
		return (
			this.collectByClassNames(html, 'item', {
				attributes: ['href', 'title'],
				sourceUrl
			})
				.map((item) => ({
					name: item.attributes?.title || item.text,
					url: `https://ok.porn${item.attributes?.href ?? ''}`
				}))
				.filter((m) => m.name && m.url) ?? []
		);
	}
}
