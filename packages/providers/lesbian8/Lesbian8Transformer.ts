import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { Lesbian8ExecArgs, Lesbian8Output, Lesbian8VideoOutput } from './Lesbian8Contracts';
import { Lesbian8Methods } from './Lesbian8Types';

/**
 * Normalizes parsed Lesbian8 metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class Lesbian8Transformer extends BaseTransformer<Lesbian8ExecArgs, DefaultExecutionResult | Lesbian8VideoOutput> {
	public async transform(url: string, request?: Lesbian8ExecArgs): Promise<DefaultExecutionResult | Lesbian8VideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<Lesbian8Output>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case Lesbian8Methods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as Lesbian8VideoOutput
				});
			default:
				return metadata;
		}
	}
}
