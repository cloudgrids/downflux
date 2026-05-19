import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PornHubChannelsOutput, PornHubExecArgs, PornHubOutput, PornHubVideoOutput, PornHubVideosOutput } from './PornHubContracts';
import { PornHubMethods } from './PornHubTypes';

/**
 * Normalizes parsed PornHub metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class PornHubTransformer extends BaseTransformer<
	PornHubExecArgs,
	PornHubVideoOutput | PornHubVideosOutput | DefaultExecutionResult | PornHubChannelsOutput[]
> {
	public async transform(
		url: string,
		request: PornHubExecArgs
	): Promise<PornHubVideoOutput | PornHubVideosOutput | PornHubChannelsOutput[] | DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornHubOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornHubMethods.getVideo:
				return this.toVideoOutput(request, metadata);

			case PornHubMethods.getVideos:
				return this.toVideosOutput(request, metadata);

			case PornHubMethods.getChannels:
				return this.toChannelsOutput(request, metadata);

			default:
				return metadata;
		}
	}

	private toVideoOutput(request: PornHubExecArgs, metadata: DefaultExecutionResult<Partial<PornHubOutput>>): PornHubVideoOutput {
		const pornHubFields = metadata?.customFields as PornHubOutput;
		return {
			pageUrl: pornHubFields?.pageUrl,
			title: metadata?.title,
			duration: pornHubFields?.duration,
			category: pornHubFields?.category,
			uploadDate: pornHubFields?.uploadDate,
			views: pornHubFields?.views,
			likes: pornHubFields?.likes,
			tags: pornHubFields?.tags,
			poster: pornHubFields?.poster,
			description: pornHubFields?.description,
			videos: {
				mp4: this.uniqueVideos(pornHubFields?.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(pornHubFields?.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			user: pornHubFields?.user,
			userAvatar: pornHubFields?.userAvatar,
			totalVideos: pornHubFields?.totalVideos,
			totalSubscribers: pornHubFields?.totalSubscribers
		};
	}

	private toVideosOutput(request: PornHubExecArgs, metadata: DefaultExecutionResult<Partial<PornHubOutput>>): PornHubVideosOutput {
		const pornHubFields = metadata?.customFields as PornHubOutput;
		let videoUrls = Array.from(new Set(metadata.anchors.filter((v) => v.match(/view_video\.php\?viewkey=([a-zA-Z0-9]{13})$/))));
		if (request?.videosArgs?.format === 'path') videoUrls = videoUrls.map((url) => url.split('=').pop() ?? url);

		return {
			videoUrls: this.unique(videoUrls),
			username: request?.username ?? 'unknown',
			currentPage: pornHubFields?.currentPage ?? '1',
			fetchedVideos: videoUrls?.length?.toString() ?? '0'
		};
	}

	private toChannelsOutput(request: PornHubExecArgs, metadata: DefaultExecutionResult<Partial<PornHubOutput>>): PornHubChannelsOutput[] {
		return (metadata.customFields?.channels as PornHubChannelsOutput[]) ?? [];
	}
}
