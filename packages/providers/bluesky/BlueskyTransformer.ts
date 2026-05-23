import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { BlueskyExecArgs, BlueskyOutput } from './BlueskyContracts';
import { BlueskyMethods } from './BlueskyTypes';

type BlueskyTransformedOutput = DefaultExecutionResult<Partial<BlueskyOutput>>;

export class BlueskyTransformer extends BaseTransformer<BlueskyExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: BlueskyExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as BlueskyTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case BlueskyMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
