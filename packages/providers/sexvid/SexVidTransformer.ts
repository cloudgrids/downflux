import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { SexVidExecArgs, SexVidOutput, SexVidVideoOutput } from './SexVidContracts';
import { SexVidMethods } from './SexVidTypes';

/**
 * Normalizes parsed SexVid metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class SexVidTransformer extends BaseTransformer<SexVidExecArgs, DefaultExecutionResult | SexVidVideoOutput> {
	public async transform(url: string, request?: SexVidExecArgs): Promise<DefaultExecutionResult | SexVidVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SexVidOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SexVidMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as SexVidVideoOutput
				});
			default:
				return metadata;
		}
	}
}
