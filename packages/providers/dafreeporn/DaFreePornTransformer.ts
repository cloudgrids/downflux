import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { DaFreePornExecArgs, DaFreePornOutput, DaFreePornVideoOutput } from './DaFreePornContracts';
import { DaFreePornMethods } from './DaFreePornTypes';

type DaFreePornTransformedOutput = DefaultExecutionResult<Partial<DaFreePornOutput>>;

/**
 * Normalizes parsed DaFreePorn metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class DaFreePornTransformer extends BaseTransformer<DaFreePornExecArgs, DefaultExecutionResult | DaFreePornVideoOutput> {
	public async transform(url: string, request?: DaFreePornExecArgs): Promise<DefaultExecutionResult | DaFreePornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DaFreePornTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case DaFreePornMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as DaFreePornVideoOutput
				});
			default:
				return metadata;
		}
	}
}
