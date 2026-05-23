import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { WikiArtExecArgs, WikiArtOutput } from './WikiArtContracts';
import { WikiArtMethods } from './WikiArtTypes';

type WikiArtTransformedOutput = DefaultExecutionResult<Partial<WikiArtOutput>>;

export class WikiArtTransformer extends BaseTransformer<WikiArtExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: WikiArtExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as WikiArtTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case WikiArtMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
