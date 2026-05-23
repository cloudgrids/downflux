import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PexelsExecArgs, PexelsOutput } from './PexelsContracts';
import { PexelsMethods } from './PexelsTypes';

type PexelsTransformedOutput = DefaultExecutionResult<Partial<PexelsOutput>>;

export class PexelsTransformer extends BaseTransformer<PexelsExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: PexelsExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as PexelsTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PexelsMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
