import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { PixivOutput } from './PixivContracts';

export class PixivParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<PixivOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as PixivOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Pixiv, 'PixivParser', { cause: error });
		}
	}
}
