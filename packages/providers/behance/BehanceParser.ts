import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { BehanceOutput } from './BehanceContracts';

export class BehanceParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<BehanceOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as BehanceOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Behance, 'BehanceParser', { cause: error });
		}
	}
}
