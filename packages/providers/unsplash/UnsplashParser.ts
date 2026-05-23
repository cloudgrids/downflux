import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { UnsplashOutput } from './UnsplashContracts';

export class UnsplashParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<UnsplashOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as UnsplashOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Unsplash, 'UnsplashParser', { cause: error });
		}
	}
}
