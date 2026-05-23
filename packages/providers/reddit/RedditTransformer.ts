import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { RedditExecArgs, RedditOutput } from './RedditContracts';
import { RedditMethods } from './RedditTypes';

type RedditTransformedOutput = DefaultExecutionResult<Partial<RedditOutput>>;

export class RedditTransformer extends BaseTransformer<RedditExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: RedditExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as RedditTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case RedditMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
