import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { BlueskyOutput } from './BlueskyContracts';

export class BlueskyParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<BlueskyOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as BlueskyOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Bluesky, 'BlueskyParser', { cause: error });
		}
	}
}
