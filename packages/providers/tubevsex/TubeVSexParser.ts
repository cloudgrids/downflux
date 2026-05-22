import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { TubeVSexOutput } from './TubeVSexContracts';

/**
 * Extracts TubeVSex-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class TubeVSexParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TubeVSexOutput>>> {
		const jsonContent = this.extractScriptsByType(html, 'application/ld+json')?.[0];

		const channelInfo = this.collectByClassNames(html, 'channel-info-det')?.[0]?.text;
		const height = this.extractMetaPropertyContent(html, 'og:video:height');

		try {
			return {
				customFields: {
					height,
					pageUrl: sourceUrl,
					quality: `${height}p`,
					videos: jsonContent?.contentUrl ? { mp4: [{ url: jsonContent.contentUrl, quality: `${height}p` }] } : { mp4: [] },
					uploadedAt: jsonContent.uploadDate,
					videoId: sourceUrl.match(/(?:video-archive|video)\/(\d+)/i)?.[1],
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					width: this.extractMetaPropertyContent(html, 'og:video:width'),
					duration: this.extractMetaPropertyContent(html, 'og:video:duration'),
					uploader: channelInfo?.match(/Is\spart\sof\snetwork\s-\s([^\n]+)/i)?.[1]
				} as TubeVSexOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.TubeVSex, 'TubeVSexParser', { cause: error });
		}
	}
}
