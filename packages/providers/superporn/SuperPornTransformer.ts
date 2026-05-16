import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideosFormat, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { SuperPornExecArgs, SuperPornOutput, SuperPornVideoOutput } from './SuperPornContracts';
import { SuperPornMethods } from './SuperPornTypes';

export class SuperPornTransformer extends BaseTransformer<SuperPornExecArgs, DefaultExecutionResult | SuperPornVideoOutput> {
	public async transform(url: string, request?: SuperPornExecArgs): Promise<DefaultExecutionResult | SuperPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SuperPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SuperPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<SuperPornOutput>>): SuperPornVideoOutput {
		const superPornFields = metadata.customFields as SuperPornOutput;

		const videos = this.mapSources(metadata.sources, superPornFields?.quality as VideoQuality);

		return {
			...superPornFields,
			pageUrl: superPornFields.pageUrl,
			tags: superPornFields?.tags,
			uploader: superPornFields?.uploader,
			videos: {
				mp4: this.uniqueVideos(videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			poster: superPornFields?.poster,
			title: superPornFields?.title || metadata.title,
			description: superPornFields?.description || metadata.description
		};
	}

	private mapSources(sources: string[], quality: VideoQuality): VideosFormat {
		return {
			mp4: sources?.map((src) => {
				const isVideoCdn = /^https:\/\/cdnst(?:\d+)?\.superporn\.com\/.*/i.test(src);
				return {
					url: src,
					quality: isVideoCdn ? quality : VideoQuality.QUnknown
				};
			}) as VideoSourceOutput[]
		};
	}
}
