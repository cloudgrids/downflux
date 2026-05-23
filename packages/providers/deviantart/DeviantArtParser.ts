import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { DeviantArtOutput } from './DeviantArtContracts';

export class DeviantArtParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<DeviantArtOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as DeviantArtOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.DeviantArt, 'DeviantArtParser', { cause: error });
		}
	}
}
