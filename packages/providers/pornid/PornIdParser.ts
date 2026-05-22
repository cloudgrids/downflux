import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { PornIdOutput } from './PornIdContracts';

/**
 * Extracts PornId-specific metadata from fetched HTML.
 *
 * @remarks
 * Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.
 */
export class PornIdParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PornIdOutput>>> {
		const uploader = html.match(/videoContentSource\s*:\s*['"]([^'"]+)['"]/i)?.[1] ?? 'unknown';

		try {
			return {
				customFields: {
					...this.getFlashVarsVideo(html, sourceUrl, uploader)
				} as PornIdOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.PornId, 'PornIdParser', { cause: error });
		}
	}
}
