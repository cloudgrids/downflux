import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { MangaDexExecArgs, MangaDexOutput } from './MangaDexContracts';
import { MangaDexMethods } from './MangaDexTypes';

type MangaDexTransformedOutput = DefaultExecutionResult<Partial<MangaDexOutput>>;

export class MangaDexTransformer extends BaseTransformer<MangaDexExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: MangaDexExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as MangaDexTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case MangaDexMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
