import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { SexVidExecArgs, SexVidOutput } from './SexVidContracts';
import { SexVidMethods } from './SexVidTypes';

export class SexVidTransformer extends BaseTransformer<SexVidExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: SexVidExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SexVidOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SexVidMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
