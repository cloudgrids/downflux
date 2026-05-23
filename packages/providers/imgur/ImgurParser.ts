import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { ImgurOutput } from './ImgurContracts';

export class ImgurParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ImgurOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as ImgurOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Imgur, 'ImgurParser', { cause: error });
		}
	}
}
