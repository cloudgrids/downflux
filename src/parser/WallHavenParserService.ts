import { DefaultExtractorResult, WallHavenWallPaperOutput } from '../util';
import { BaseParserService } from './BaseParserService';

type CollectionData = {
	href?: string;
	label?: string;
	thumbnails: string[];
	backgroundImage?: string;
	stats: {
		images?: number;
		views?: number;
		subscribers?: number;
	};
};

export class WallHavenParserService extends BaseParserService {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExtractorResult> {
		const descriptionParts = this.extractMetaDescription(html)?.split('|');
		const description = descriptionParts?.[0]?.trim();
		const tags = description?.split(',').map((s) => s?.trim()) ?? [];
		const resolution = descriptionParts?.[1]?.trim()?.split(' ')[0];
		const [dimensionX, dimensionY] = resolution?.split('x')?.map((a) => Number(a)) ?? [];
		const uploader = description.split("'")[0];
		const ratio = dimensionX && dimensionY ? (dimensionY / dimensionX).toFixed(2) : '0.00';

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
				collection: this.extractCollectionData(html),
				totalContents: this.extractElementText(html, 'class="far fa-fw fa-gap fa-images"></i>', '</'),
				...this.extractDefinitionList(html)
			} as Partial<WallHavenWallPaperOutput>
		};
	}

	public extractCollectionData(html: string): CollectionData[] {
		const blocks = this.collectByClassNames(html, 'collection-inner', {
			includeInnerHTML: true,
			attributes: ['href']
		});

		return blocks.map((item) => {
			const block = item.innerHTML || '';

			return {
				href: item.attributes?.href?.trim(),

				label: this.extractByClass(block, 'collection-label')[0],

				thumbnails: this.extractAttributes(block, 'img', 'src'),

				backgroundImage: /background-image:\s*url\(([^)]+)\)/i.exec(block)?.[1]?.replace(/['"]/g, '')?.trim(),

				stats: {
					images: Number(/fa-images[\s\S]*?>\s*(\d+)/i.exec(block)?.[1]),
					views: Number(/fa-eye[\s\S]*?>\s*(\d+)/i.exec(block)?.[1]),
					subscribers: Number(/fa-bookmark[\s\S]*?>\s*(\d+)/i.exec(block)?.[1])
				}
			};
		});
	}

	public extractDefinitionList(html: string): Record<string, string> {
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
