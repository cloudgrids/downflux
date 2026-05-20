import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ZbPornExecArgs, ZbPornOutput, ZbPornVideoOutput } from './ZbPornContracts';
import { ZbPornMethods } from './ZbPornTypes';

type ZbPornTransformedOutput = DefaultExecutionResult<Partial<ZbPornOutput>>;

/**
 * Normalizes parsed ZbPorn metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class ZbPornTransformer extends BaseTransformer<ZbPornExecArgs, DefaultExecutionResult | ZbPornVideoOutput> {
	public async transform(url: string, request?: ZbPornExecArgs): Promise<DefaultExecutionResult | ZbPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as ZbPornTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ZbPornMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as ZbPornVideoOutput
				});
			default:
				return metadata;
		}
	}
}
