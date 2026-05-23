import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ImgurExecArgs, ImgurOutput } from './ImgurContracts';
import { ImgurMethods } from './ImgurTypes';

type ImgurTransformedOutput = DefaultExecutionResult<Partial<ImgurOutput>>;

export class ImgurTransformer extends BaseTransformer<ImgurExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: ImgurExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as ImgurTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ImgurMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
