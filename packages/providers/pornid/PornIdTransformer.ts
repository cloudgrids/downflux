import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PornIdExecArgs, PornIdOutput, PornIdVideoOutput } from './PornIdContracts';
import { PornIdMethods } from './PornIdTypes';

export class PornIdTransformer extends BaseTransformer<PornIdExecArgs, DefaultExecutionResult | PornIdVideoOutput> {
	public async transform(url: string, request?: PornIdExecArgs): Promise<DefaultExecutionResult | PornIdVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornIdOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornIdMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<PornIdOutput>>): PornIdVideoOutput {
		const customFields = metadata.customFields as PornIdOutput;
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
