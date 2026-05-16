import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ColliderPornExecArgs, ColliderPornOutput, ColliderPornVideoOutput } from './ColliderPornContracts';
import { ColliderPornMethods } from './ColliderPornTypes';

export class ColliderPornTransformer extends BaseTransformer<ColliderPornExecArgs, DefaultExecutionResult | ColliderPornVideoOutput> {
	public async transform(url: string, request?: ColliderPornExecArgs): Promise<DefaultExecutionResult | ColliderPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<ColliderPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ColliderPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<ColliderPornOutput>>): ColliderPornVideoOutput {
		const customFields = metadata.customFields as ColliderPornOutput;
		return {
			...customFields,
			videos: {
				mp4: this.uniqueVideos(customFields.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(customFields.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			description: metadata?.description,
			tags: metadata?.keywords,
			title: metadata?.title
		};
	}
}
