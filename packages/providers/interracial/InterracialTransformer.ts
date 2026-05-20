import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { InterracialExecArgs, InterracialOutput, InterracialVideoOutput } from './InterracialContracts';
import { InterracialMethods } from './InterracialTypes';

type InterracialTransformedOutput = DefaultExecutionResult<Partial<InterracialOutput>>;

/**
 * Normalizes parsed Interracial metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class InterracialTransformer extends BaseTransformer<InterracialExecArgs, DefaultExecutionResult | InterracialVideoOutput> {
	public async transform(url: string, request?: InterracialExecArgs): Promise<DefaultExecutionResult | InterracialVideoOutput> {
		const metadata = (await super.transform(url, request)) as InterracialTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case InterracialMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as InterracialVideoOutput
				});
			default:
				return metadata;
		}
	}
}
