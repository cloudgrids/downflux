import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { PexelsOutput } from './PexelsContracts';

export class PexelsParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PexelsOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as PexelsOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Pexels, 'PexelsParser', { cause: error });
		}
	}
}
