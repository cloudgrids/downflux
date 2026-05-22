import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { VideoQuality } from '@types';
import { PornOneExecArgs, PornOneOutput, PornOneVideoOutput } from './PornOneContracts';
import { PornOneMethods } from './PornOneTypes';

/**
 * Normalizes parsed PornOne metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class PornOneTransformer extends BaseTransformer<PornOneExecArgs, DefaultExecutionResult | PornOneVideoOutput> {
	public async transform(url: string, request?: PornOneExecArgs): Promise<DefaultExecutionResult | PornOneVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornOneOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornOneMethods.getVideo:
				return this.defaultVideoOutput(metadata, {
					filter: (source) => source?.includes('pornone'),
					quality: metadata?.customFields?.quality as VideoQuality,
					extraFields: {
						uploader: metadata?.customFields?.uploader
					}
				});
			default:
				return metadata;
		}
	}
}
