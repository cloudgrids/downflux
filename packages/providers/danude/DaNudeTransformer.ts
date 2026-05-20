import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { DaNudeExecArgs, DaNudeOutput, DaNudeVideoOutput } from './DaNudeContracts';
import { DaNudeMethods } from './DaNudeTypes';

type DaNudeTransformedOutput = DefaultExecutionResult<Partial<DaNudeOutput>>;

/**
 * Normalizes parsed DaNude metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class DaNudeTransformer extends BaseTransformer<DaNudeExecArgs, DefaultExecutionResult | DaNudeVideoOutput> {
	public async transform(url: string, request?: DaNudeExecArgs): Promise<DefaultExecutionResult | DaNudeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DaNudeTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case DaNudeMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as DaNudeVideoOutput
				});
			default:
				return metadata;
		}
	}
}
