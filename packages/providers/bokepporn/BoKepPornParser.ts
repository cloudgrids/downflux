import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { BoKepPornOutput } from './BoKepPornContracts';

export class BoKepPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<BoKepPornOutput>>> {
		const flashVars = this.getFlashVars(html);
		const poster = this.extractMetaPropertyContent(html, 'og:image');
		const uploader = this.collectByClassNames(html, 'user-weeks-block__title username', { includeInnerHTML: true })?.[0];
		const starred = this.collectByClassNames(html, 'row-categories__link hoverRed', { includeInnerHTML: true });

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					videos: {
						mp4: flashVars?.videos
					},
					poster: poster?.startsWith('http://') ? poster : `https:${poster}`,
					videoId: flashVars?.videoId,
					previews: flashVars?.previews,
					uploader: uploader?.text,
					starred: starred?.map((item) => item?.text),
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as BoKepPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.BoKepPorn, 'BoKepPornParser', { cause: error });
		}
	}
}
