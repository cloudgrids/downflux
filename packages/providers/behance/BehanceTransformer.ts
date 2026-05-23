import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { BehanceExecArgs, BehanceOutput } from './BehanceContracts';
import { BehanceMethods } from './BehanceTypes';

type BehanceTransformedOutput = DefaultExecutionResult<Partial<BehanceOutput>>;

export class BehanceTransformer extends BaseTransformer<BehanceExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: BehanceExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as BehanceTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case BehanceMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
