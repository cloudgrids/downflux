import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ArtStationExecArgs, ArtStationOutput } from './ArtStationContracts';
import { ArtStationMethods } from './ArtStationTypes';

type ArtStationTransformedOutput = DefaultExecutionResult<Partial<ArtStationOutput>>;

export class ArtStationTransformer extends BaseTransformer<ArtStationExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: ArtStationExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as ArtStationTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ArtStationMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
