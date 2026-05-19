import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { SexVidExecArgs, SexVidOutput, SexVidVideoOutput } from './SexVidContracts';
import { SexVidMethods } from './SexVidTypes';

/**
 * Normalizes parsed SexVid metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class SexVidTransformer extends BaseTransformer<SexVidExecArgs, DefaultExecutionResult | SexVidVideoOutput> {
	public async transform(url: string, request?: SexVidExecArgs): Promise<DefaultExecutionResult | SexVidVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SexVidOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SexVidMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<SexVidOutput>>): SexVidVideoOutput {
		const sexVidFields = metadata.customFields as SexVidOutput;
		return {
			actor: sexVidFields?.actor,
			description: metadata.description,
			duration: sexVidFields?.duration,
			pageUrl: sexVidFields?.pageUrl,
			poster: sexVidFields?.poster,
			releasedAt: sexVidFields?.releasedAt,
			tags: metadata.keywords,
			title: metadata.title,
			videos: {
				mp4: this.uniqueVideos(sexVidFields?.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(sexVidFields?.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			}
		};
	}
}
