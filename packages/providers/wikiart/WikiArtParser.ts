import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { WikiArtOutput } from './WikiArtContracts';

export class WikiArtParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<WikiArtOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as WikiArtOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.WikiArt, 'WikiArtParser', { cause: error });
		}
	}
}
