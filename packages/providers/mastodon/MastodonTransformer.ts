import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { MastodonExecArgs, MastodonOutput } from './MastodonContracts';
import { MastodonMethods } from './MastodonTypes';

type MastodonTransformedOutput = DefaultExecutionResult<Partial<MastodonOutput>>;

export class MastodonTransformer extends BaseTransformer<MastodonExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: MastodonExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as MastodonTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case MastodonMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
