import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { DanbooruOutput } from './DanbooruContracts';

export class DanbooruParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<DanbooruOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as DanbooruOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Danbooru, 'DanbooruParser', { cause: error });
		}
	}
}
