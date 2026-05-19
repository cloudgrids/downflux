import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TnAFlixExecArgs, TnAFlixOutput, TnAFlixVideoOutput } from './TnAFlixContracts';
import { TnAFlixMethods } from './TnAFlixTypes';

/**
 * Normalizes parsed TnAFlix metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class TnAFlixTransformer extends BaseTransformer<TnAFlixExecArgs, TnAFlixVideoOutput | DefaultExecutionResult> {
	public override async transform(
		url: string,
		request?: TnAFlixExecArgs | undefined
	): Promise<DefaultExecutionResult | TnAFlixVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<TnAFlixOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request.method) {
			case TnAFlixMethods.getVideo:
				return this.toVideoOutput(request, metadata);

			default:
				return metadata;
		}
	}

	private toVideoOutput(request: TnAFlixExecArgs, metadata: DefaultExecutionResult<Partial<TnAFlixOutput>>): TnAFlixVideoOutput {
		const tnAFlixFields = metadata.customFields as TnAFlixOutput;

		return {
			disLikes: tnAFlixFields?.disLikes,
			likes: tnAFlixFields?.likes,
			pageUrl: tnAFlixFields?.pageUrl ?? request.entryUrl,
			title: tnAFlixFields?.title,
			poster: tnAFlixFields?.poster,
			videos: {
				mp4: this.uniqueVideos(tnAFlixFields?.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(tnAFlixFields?.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			tags: tnAFlixFields?.tags,
			uploader: tnAFlixFields?.uploader,
			videoId: tnAFlixFields?.videoId,
			description: metadata?.description
		};
	}
}
