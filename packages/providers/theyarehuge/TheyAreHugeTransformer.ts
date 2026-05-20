import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TheyAreHugeExecArgs, TheyAreHugeOutput, TheyAreHugeVideoOutput } from './TheyAreHugeContracts';
import { TheyAreHugeMethods } from './TheyAreHugeTypes';

/**
 * Normalizes parsed TheyAreHuge metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class TheyAreHugeTransformer extends BaseTransformer<TheyAreHugeExecArgs, DefaultExecutionResult | TheyAreHugeVideoOutput> {
	public async transform(url: string, request?: TheyAreHugeExecArgs): Promise<DefaultExecutionResult | TheyAreHugeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<TheyAreHugeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case TheyAreHugeMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as TheyAreHugeVideoOutput
				});
			default:
				return metadata;
		}
	}
}
