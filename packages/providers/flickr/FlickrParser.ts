import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { FlickrOutput } from './FlickrContracts';

export class FlickrParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<FlickrOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as FlickrOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Flickr, 'FlickrParser', { cause: error });
		}
	}
}
