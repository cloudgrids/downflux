import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ShamelessExecArgs, ShamelessOutput, ShamelessVideoOutput } from './ShamelessContracts';
import { ShamelessMethods } from './ShamelessTypes';

export class ShamelessTransformer extends BaseTransformer<ShamelessExecArgs, DefaultExecutionResult | ShamelessVideoOutput> {
	public async transform(url: string, request?: ShamelessExecArgs): Promise<DefaultExecutionResult | ShamelessVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<ShamelessOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ShamelessMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<ShamelessOutput>>): ShamelessVideoOutput {
		const customFields = metadata.customFields as ShamelessOutput;
		return {
			...customFields,
			description: metadata?.description,
			keywords: metadata?.keywords,
			title: metadata?.title
		};
	}
}
