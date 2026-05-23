import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { NewgroundsExecArgs, NewgroundsOutput } from './NewgroundsContracts';
import { NewgroundsMethods } from './NewgroundsTypes';

type NewgroundsTransformedOutput = DefaultExecutionResult<Partial<NewgroundsOutput>>;

export class NewgroundsTransformer extends BaseTransformer<NewgroundsExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: NewgroundsExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as NewgroundsTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case NewgroundsMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
