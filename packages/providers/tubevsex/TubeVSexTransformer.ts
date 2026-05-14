import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TubeVSexExecArgs, TubeVSexOutput, TubeVSexVideoOutput } from './TubeVSexContracts';
import { TubeVSexMethods } from './TubeVSexTypes';

export class TubeVSexTransformer extends BaseTransformer<TubeVSexExecArgs, DefaultExecutionResult | TubeVSexVideoOutput> {
	public async transform(url: string, request?: TubeVSexExecArgs): Promise<DefaultExecutionResult | TubeVSexVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<TubeVSexOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case TubeVSexMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<TubeVSexOutput>>): TubeVSexVideoOutput {
		const tubeVSexFields = metadata.customFields as TubeVSexOutput;
		return {
			...tubeVSexFields,
			title: metadata.title
		};
	}
}
