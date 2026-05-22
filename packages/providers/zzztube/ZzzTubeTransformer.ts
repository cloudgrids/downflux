import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ZzzTubeExecArgs, ZzzTubeOutput, ZzzTubeVideoOutput } from './ZzzTubeContracts';
import { ZzzTubeMethods } from './ZzzTubeTypes';

/**
 * Normalizes parsed ZzzTube metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class ZzzTubeTransformer extends BaseTransformer<ZzzTubeExecArgs, DefaultExecutionResult | ZzzTubeVideoOutput> {
	public async transform(url: string, request?: ZzzTubeExecArgs): Promise<DefaultExecutionResult | ZzzTubeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<ZzzTubeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ZzzTubeMethods.getVideo:
				return this.defaultVideoOutput(metadata, {
					filter: (url) => /^https:\/\/(?:vcdn(?:\d+)\.)?zzztube\.(?:com)\/key.*_\.mp4$/i.test(url)
				});
			default:
				return metadata;
		}
	}
}
