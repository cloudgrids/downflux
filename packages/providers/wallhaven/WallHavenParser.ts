import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import path from 'path';
import { WallHavenOutput, WallHavenUserFavoriteCollectionsOutput } from './WallHavenContracts';
import { WallHavenThumbnailQuality } from './WallHavenTypes';

/**
 * Extracts WallHaven-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class WallHavenParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<WallHavenOutput>>> {
		const descriptionParts = this.extractMetaDescription(html)?.split('|');
		const description = descriptionParts?.[0]?.trim();
		const tags = description?.split(',').map((s) => s?.trim()) ?? [];
		const resolution = descriptionParts?.[1]?.trim()?.split(' ')[0];
		const [dimensionX, dimensionY] = resolution?.split('x')?.map((a) => Number(a)) ?? [];
		const uploader = description.split("'")[0];
		const ratio = dimensionX && dimensionY ? (dimensionY / dimensionX).toFixed(2) : '0.00';
		try {
			return {
				description,
				sourceUrl,
				customFields: {
					resolution,
					tags,
					uploader,
					dimensionX,
					dimensionY,
					ratio,
					collections: this.extractCollectionData(html),
					totalContents: Number(this.extractElementText(html, 'class="far fa-fw fa-gap fa-images"></i>', '</') ?? 0),
					...this.extractDefinitionList(html)
				} as Partial<WallHavenOutput>
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.WallHaven, 'WallHavenParser', { cause: error });
		}
	}

	private extractCollectionData(html: string): WallHavenUserFavoriteCollectionsOutput[] {
		const blocks = this.collectByClassNames(html, 'collection-inner', {
			includeInnerHTML: true,
			attributes: ['href']
		});

		return blocks.map((item) => {
			const block = item.innerHTML || '';
			const siteUrl = item.attributes?.href?.trim() as string;
			const siteUrlParts = siteUrl?.split('/').filter(Boolean) ?? [];

			return {
				url: siteUrl,
				name: this.extractByClass(block, 'collection-label')[0] ?? 'unknown',
				id: siteUrlParts.pop(),
				uploader: siteUrlParts[3] ?? 'unknown',

				thumbnails: this.extractAttributes(block, 'img', 'src')?.map((src) => ({
					url: src,
					siteUrl,
					id: path.parse(src).name,
					quality: src.includes('/small/') ? WallHavenThumbnailQuality.LOW : WallHavenThumbnailQuality.HIGH
				})),

				backgroundUrl: /background-image:\s*url\(([^)]+)\)/i.exec(block)?.[1]?.replace(/['"]/g, '')?.trim() ?? null,
				wallPaperCount: Number(/fa-images[\s\S]*?>\s*(\d+)/i.exec(block)?.[1] ?? 0),
				viewCount: Number(/fa-eye[\s\S]*?>\s*(\d+)/i.exec(block)?.[1] ?? 0),
				subscriberCount: Number(/fa-bookmark[\s\S]*?>\s*(\d+)/i.exec(block)?.[1] ?? 0)
			} as WallHavenUserFavoriteCollectionsOutput;
		}) as WallHavenUserFavoriteCollectionsOutput[];
	}

	private extractDefinitionList(html: string): Record<string, string> {
		const result: Record<string, string> = {};
		const dlStart = html.toLowerCase().indexOf('<dl');
		if (dlStart === -1) return result;
		const dlEnd = html.toLowerCase().indexOf('</dl>', dlStart);
		if (dlEnd === -1) return result;

		const dlContent = html.slice(dlStart, dlEnd); // <dl> ... </dl>
		const tagRegex = /<(dt|dd)\b[^>]*>([\s\S]*?)<\/\1>/gi;
		let match;
		let currentKey: string | null = null;

		while ((match = tagRegex.exec(dlContent)) !== null) {
			const tag = match[1].toLowerCase();
			const innerHTML = match[2];
			const text = this.decodeHtmlEntities(
				innerHTML
					.replace(/<br\s*\/?>/gi, ' ')
					.replace(/<[^>]*>/g, '')
					.replace(/\s+/g, ' ')
					.trim()
			).toLowerCase();

			if (tag === 'dt') {
				currentKey = text;
			} else if (tag === 'dd' && currentKey) {
				result[currentKey] = text;
				currentKey = null;
			}
		}

		return result;
	}
}
