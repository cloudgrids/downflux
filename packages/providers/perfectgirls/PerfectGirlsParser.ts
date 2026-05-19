import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { inferVideoQuality } from '@shared';
import { ProviderType } from '@types';
import { PerfectGirlsModelVideoCard, PerfectGirlsOutput } from './PerfectGirlsContracts';

/**
 * Extracts PerfectGirls-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class PerfectGirlsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PerfectGirlsOutput>>> {
		const videoInfo = this.getVideoInfo(html);

		const hls = this.collectElements(html, 'source')?.map((source) => ({
			url: source?.src,
			quality: inferVideoQuality(source?.src)
		}));

		try {
			return {
				images: this.extractAttributes(html, 'img', 'data-original'),
				title: this.decodeHtmlEntities(this.extractTitle(html)),
				customFields: {
					author: videoInfo?.author || 'unknown',
					starredModels: videoInfo?.actor,
					modelName: this.extractCustomTitle(html).split('/').filter(Boolean).pop()?.trim() || 'unknown',
					videoAlbumId: this.extractAttributes(html, 'a', 'href')
						.find((h) => /\/albums\/\d+\//.test(h))
						?.match(/\/albums\/(\d+)\//)?.[1],
					videoCreatedAt: videoInfo?.uploadDate,
					poster: videoInfo?.thumbnailUrl || this.extractVideoPosters(html)[0],
					videoCards: this.extractVideoCards(html) ?? [],
					videos: { hls }
				},
				videoPosters: this.extractVideoPosters(html),
				description: videoInfo?.description || this.extractMetaDescription(html),
				keywords: videoInfo?.keywords || [],
				sourceUrl
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PerfectGirls, 'PerfectGirlsParser', { cause: error });
		}
	}

	private extractVideoCards(html: string, sourceUrl?: string): PerfectGirlsModelVideoCard[] {
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
			.filter(Boolean) as PerfectGirlsModelVideoCard[];
	}

	private extractCustomTitle(html: string): string {
		return this.extractElementText(html, 'class="item" href="', '"');
	}

	private extractStarredModels(html: string, sourceUrl?: string) {
		const origin = sourceUrl ? new URL(sourceUrl).origin : 'https://perfectgirls.xxx';

		return (
			this.collectByClassNames(html, 'item', {
				attributes: ['href', 'title'],
				sourceUrl
			})
				.map((item) => ({
					name: item.attributes?.title || item.text,
					url: `${origin}/${item.attributes?.href ?? ''}`
				}))
				.filter((m) => m.name && m.url) ?? []
		);
	}

	private getVideoInfo(html: string) {
		return this.extractScriptsByType(html, 'application/ld+json').map((script) => JSON.parse(script))?.[0];
	}
}
