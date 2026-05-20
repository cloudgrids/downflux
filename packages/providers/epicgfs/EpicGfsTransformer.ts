import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { EpicGfsExecArgs, EpicGfsOutput, EpicGfsVideoOutput } from './EpicGfsContracts';
import { EpicGfsMethods } from './EpicGfsTypes';

type EpicGfsTransformedOutput = DefaultExecutionResult<Partial<EpicGfsOutput>>;

/**
 * Normalizes parsed EpicGfs metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class EpicGfsTransformer extends BaseTransformer<EpicGfsExecArgs, DefaultExecutionResult | EpicGfsVideoOutput> {
	public async transform(url: string, request?: EpicGfsExecArgs): Promise<DefaultExecutionResult | EpicGfsVideoOutput> {
		const metadata = (await super.transform(url, request)) as EpicGfsTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case EpicGfsMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as EpicGfsVideoOutput
				});
			default:
				return metadata;
		}
	}
}
