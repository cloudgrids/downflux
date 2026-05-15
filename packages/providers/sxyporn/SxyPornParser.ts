import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { SxyPornOutput } from './SxyPornContracts';

export class SxyPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SxyPornOutput>>> {
		const uploader = this.collectByClassNames(html, 'pes_author_div pes_edit_div transition', { includeInnerHTML: true });
		const videoMeta = html.match(/duration:<b>(.*?)<\/b>\s*·\s*resolution:<b>.*?<\/b>(\d+)/i);

		console.log({ uploader, videoMeta });
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					description: this.extractMetaPropertyContent(html, 'og:description'),
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					title: this.extractMetaPropertyContent(html, 'og:title'),
					uploader: uploader?.[0]?.text?.trim() || 'Unknown',
					duration: videoMeta?.[1]?.trim(),
					videos: {
						mp4: this.extractVideoUrls(html)?.map((url) => ({ url, quality: videoMeta?.[2] || VideoQuality.QUnknown })) || []
					}
				} as SxyPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SxyPorn, 'SxyPornParser', { cause: error });
		}
	}
}
