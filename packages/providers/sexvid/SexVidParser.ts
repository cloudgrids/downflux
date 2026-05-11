import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { SexVidOutput } from './SexVidContracts';

export class SexVidParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SexVidOutput>>> {
		try {
			return {
				customFields: {} as SexVidOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SexVid, 'SexVidParser', { cause: error });
		}
	}
}
