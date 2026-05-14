import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { TubeVSexOutput } from './TubeVSexContracts';

export class TubeVSexParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TubeVSexOutput>>> {
		const jsonContent = this.extractScriptsByType(html, 'application/ld+json')?.map((s) => JSON.parse(s))?.[0];

		const channelInfo = this.collectByClassNames(html, 'channel-info-det')?.[0]?.text;
		const height = this.extractMetaPropertyContent(html, 'og:video:height');

		try {
			return {
				customFields: {
					height,
					pageUrl: sourceUrl,
					quality: `${height}p`,
					videoUrl: jsonContent?.contentUrl,
					uploadedAt: jsonContent.uploadDate,
					videoId: sourceUrl.match(/video-archive\/(\d+)/i)?.[1],
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					width: this.extractMetaPropertyContent(html, 'og:video:width'),
					duration: this.extractMetaPropertyContent(html, 'og:video:duration'),
					uploader: channelInfo?.match(/Is\spart\sof\snetwork\s-\s([^\n]+)/i)?.[1]
				} as TubeVSexOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.TubeVSex, 'TubeVSexParser', { cause: error });
		}
	}
}
