import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { GelbooruOutput } from './GelbooruContracts';

export class GelbooruParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<GelbooruOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as GelbooruOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Gelbooru, 'GelbooruParser', { cause: error });
		}
	}
}
