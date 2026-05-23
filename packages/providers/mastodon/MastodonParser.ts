import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { MastodonOutput } from './MastodonContracts';

export class MastodonParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MastodonOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as MastodonOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Mastodon, 'MastodonParser', { cause: error });
		}
	}
}
