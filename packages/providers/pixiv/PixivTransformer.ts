import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PixivExecArgs, PixivOutput } from './PixivContracts';
import { PixivMethods } from './PixivTypes';

type PixivTransformedOutput = DefaultExecutionResult<Partial<PixivOutput>>;

export class PixivTransformer extends BaseTransformer<PixivExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: PixivExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as PixivTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PixivMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
