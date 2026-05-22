import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { CumLouderExecArgs, CumLouderOutput, CumLouderVideoOutput } from './CumLouderContracts';
import { CumLouderMethods } from './CumLouderTypes';

/**
 * Normalizes parsed CumLouder metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class CumLouderTransformer extends BaseTransformer<CumLouderExecArgs, DefaultExecutionResult | CumLouderVideoOutput> {
	public async transform(url: string, request?: CumLouderExecArgs): Promise<DefaultExecutionResult | CumLouderVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<CumLouderOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case CumLouderMethods.getVideo:
				return this.defaultVideoOutput(metadata, {
					filter: (src) => /^https:\/\/mediacdnst(?:\d+)\.cumlouder\.com\/.*/i.test(src)
				});
			default:
				return metadata;
		}
	}
}
