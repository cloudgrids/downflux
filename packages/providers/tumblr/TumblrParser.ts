import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { TumblrOutput } from './TumblrContracts';

export class TumblrParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TumblrOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as TumblrOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Tumblr, 'TumblrParser', { cause: error });
		}
	}
}
