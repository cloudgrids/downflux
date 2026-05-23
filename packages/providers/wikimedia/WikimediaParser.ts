import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { WikimediaOutput } from './WikimediaContracts';

export class WikimediaParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<WikimediaOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as WikimediaOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Wikimedia, 'WikimediaParser', { cause: error });
		}
	}
}
