import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { NewgroundsOutput } from './NewgroundsContracts';

export class NewgroundsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<NewgroundsOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as NewgroundsOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Newgrounds, 'NewgroundsParser', { cause: error });
		}
	}
}
