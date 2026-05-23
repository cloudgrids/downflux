import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { DanbooruExecArgs, DanbooruOutput } from './DanbooruContracts';
import { DanbooruMethods } from './DanbooruTypes';

type DanbooruTransformedOutput = DefaultExecutionResult<Partial<DanbooruOutput>>;

export class DanbooruTransformer extends BaseTransformer<DanbooruExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: DanbooruExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as DanbooruTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case DanbooruMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
