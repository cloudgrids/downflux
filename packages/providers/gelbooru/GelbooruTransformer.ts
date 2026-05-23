import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GelbooruExecArgs, GelbooruOutput } from './GelbooruContracts';
import { GelbooruMethods } from './GelbooruTypes';

type GelbooruTransformedOutput = DefaultExecutionResult<Partial<GelbooruOutput>>;

export class GelbooruTransformer extends BaseTransformer<GelbooruExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: GelbooruExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as GelbooruTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case GelbooruMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
