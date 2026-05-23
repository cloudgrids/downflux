import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { InstagramExecArgs, InstagramOutput } from './InstagramContracts';
import { InstagramMethods } from './InstagramTypes';

type InstagramTransformedOutput = DefaultExecutionResult<Partial<InstagramOutput>>;

export class InstagramTransformer extends BaseTransformer<InstagramExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: InstagramExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as InstagramTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case InstagramMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
