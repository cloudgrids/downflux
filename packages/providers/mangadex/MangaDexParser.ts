import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { MangaDexOutput } from './MangaDexContracts';

export class MangaDexParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MangaDexOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as MangaDexOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.MangaDex, 'MangaDexParser', { cause: error });
		}
	}
}
