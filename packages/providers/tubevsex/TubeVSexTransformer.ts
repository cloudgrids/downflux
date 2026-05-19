import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TubeVSexExecArgs, TubeVSexOutput, TubeVSexVideoOutput } from './TubeVSexContracts';
import { TubeVSexMethods } from './TubeVSexTypes';

/**
 * Normalizes parsed TubeVSex metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class TubeVSexTransformer extends BaseTransformer<TubeVSexExecArgs, DefaultExecutionResult | TubeVSexVideoOutput> {
	public async transform(url: string, request?: TubeVSexExecArgs): Promise<DefaultExecutionResult | TubeVSexVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<TubeVSexOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case TubeVSexMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<TubeVSexOutput>>): TubeVSexVideoOutput {
		const tubeVSexFields = metadata.customFields as TubeVSexOutput;
		return {
			...tubeVSexFields,
			videos: {
				mp4: this.uniqueVideos(tubeVSexFields.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(tubeVSexFields.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			title: metadata.title,
			description: metadata.description,
			tags: metadata.keywords || []
		};
	}
}
