import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { MomVidsExecArgs, MomVidsOutput, MomVidsVideoOutput } from './MomVidsContracts';
import { MomVidsMethods } from './MomVidsTypes';

type MomVidsTransformedOutput = DefaultExecutionResult<Partial<MomVidsOutput>>;

/**
 * Normalizes parsed MomVids metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class MomVidsTransformer extends BaseTransformer<MomVidsExecArgs, DefaultExecutionResult | MomVidsVideoOutput> {
	public async transform(url: string, request?: MomVidsExecArgs): Promise<DefaultExecutionResult | MomVidsVideoOutput> {
		const metadata = (await super.transform(url, request)) as MomVidsTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case MomVidsMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as MomVidsVideoOutput
				});
			default:
				return metadata;
		}
	}
}
