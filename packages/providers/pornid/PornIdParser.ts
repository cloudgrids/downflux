import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { PornIdOutput } from './PornIdContracts';

export class PornIdParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PornIdOutput>>> {
		const flashVars = this.getFlashVars(html);
		const uploader = html.match(/videoContentSource\s*:\s*['"]([^'"]+)['"]/i)?.[1] ?? 'unknown';

		try {
			return {
				customFields: {
					uploader,
					videos: { mp4: flashVars.videos },
					pageUrl: sourceUrl,
					poster: flashVars?.previewUrl,
					id: flashVars?.videoId,
					categories: flashVars?.categories,
					previews: flashVars?.previews,
					timelineScreenCount: flashVars?.timelineScreenCount,
					timelineScreens: flashVars?.timelineScreens
				} as PornIdOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.PornId, 'PornIdParser', { cause: error });
		}
	}
}
