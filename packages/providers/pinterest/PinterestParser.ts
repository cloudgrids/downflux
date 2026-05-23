import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { PinterestOutput } from './PinterestContracts';

export class PinterestParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PinterestOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as PinterestOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Pinterest, 'PinterestParser', { cause: error });
		}
	}
}
