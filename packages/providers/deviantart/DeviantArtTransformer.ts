import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { DeviantArtExecArgs, DeviantArtOutput } from './DeviantArtContracts';
import { DeviantArtMethods } from './DeviantArtTypes';

type DeviantArtTransformedOutput = DefaultExecutionResult<Partial<DeviantArtOutput>>;

export class DeviantArtTransformer extends BaseTransformer<DeviantArtExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: DeviantArtExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as DeviantArtTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case DeviantArtMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
