import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { InstagramOutput } from './InstagramContracts';

export class InstagramParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<InstagramOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as InstagramOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Instagram, 'InstagramParser', { cause: error });
		}
	}
}
