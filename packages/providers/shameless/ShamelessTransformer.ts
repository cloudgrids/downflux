import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ShamelessExecArgs, ShamelessOutput, ShamelessVideoOutput } from './ShamelessContracts';
import { ShamelessMethods } from './ShamelessTypes';

/**
 * Normalizes parsed Shameless metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class ShamelessTransformer extends BaseTransformer<ShamelessExecArgs, DefaultExecutionResult | ShamelessVideoOutput> {
	public async transform(url: string, request?: ShamelessExecArgs): Promise<DefaultExecutionResult | ShamelessVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<ShamelessOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ShamelessMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as ShamelessVideoOutput
				});
			default:
				return metadata;
		}
	}
}
