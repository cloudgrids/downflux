import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PornIdExecArgs, PornIdOutput, PornIdVideoOutput } from './PornIdContracts';
import { PornIdMethods } from './PornIdTypes';

/**
 * Normalizes parsed PornId metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class PornIdTransformer extends BaseTransformer<PornIdExecArgs, DefaultExecutionResult | PornIdVideoOutput> {
	public async transform(url: string, request?: PornIdExecArgs): Promise<DefaultExecutionResult | PornIdVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornIdOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornIdMethods.getVideo:
				return this.defaultFlashVarsVideoOutput({
					...metadata,
					customFields: metadata.customFields as PornIdVideoOutput
				});
			default:
				return metadata;
		}
	}
}
