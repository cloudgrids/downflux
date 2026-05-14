import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { Lesbian8ExecArgs, Lesbian8Output, Lesbian8VideoOutput } from './Lesbian8Contracts';
import { Lesbian8Methods } from './Lesbian8Types';

export class Lesbian8Transformer extends BaseTransformer<Lesbian8ExecArgs, DefaultExecutionResult | Lesbian8VideoOutput> {
	public async transform(url: string, request?: Lesbian8ExecArgs): Promise<DefaultExecutionResult | Lesbian8VideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<Lesbian8Output>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case Lesbian8Methods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<Lesbian8Output>>): Lesbian8VideoOutput {
		const lesbian8Fields = metadata.customFields as Lesbian8Output;
		return {
			...lesbian8Fields,
			description: metadata.description
		};
	}
}
