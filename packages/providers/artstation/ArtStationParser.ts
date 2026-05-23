import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { ArtStationOutput } from './ArtStationContracts';

export class ArtStationParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ArtStationOutput>>> {
		try {
			return {
				customFields: { sourceUrl, allUrls: this.extractAllUrls(html) } as ArtStationOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.ArtStation, 'ArtStationParser', { cause: error });
		}
	}
}
