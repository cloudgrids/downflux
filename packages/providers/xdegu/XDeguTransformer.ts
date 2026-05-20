import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XDeguExecArgs, XDeguOutput, XDeguVideoOutput } from './XDeguContracts';
import { XDeguMethods } from './XDeguTypes';

type XDeguTransformedOutput = DefaultExecutionResult<Partial<XDeguOutput>>;

/**
 * Normalizes parsed XDegu metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class XDeguTransformer extends BaseTransformer<XDeguExecArgs, DefaultExecutionResult | XDeguVideoOutput> {
	public async transform(url: string, request?: XDeguExecArgs): Promise<DefaultExecutionResult | XDeguVideoOutput> {
		const metadata = (await super.transform(url, request)) as XDeguTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XDeguMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as XDeguVideoOutput
				});
			default:
				return metadata;
		}
	}
}
