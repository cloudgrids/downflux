import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PornHubChannelsOutput, PornHubExecArgs, PornHubOutput, PornHubVideoOutput, PornHubVideosOutput } from './PornHubContracts';
import { PornHubMethods } from './PornHubTypes';

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
			videoUrl: pornHubFields?.videoUrl,
			title: metadata?.title,
			thumbnailUrl: pornHubFields?.thumbnailUrl,
			duration: pornHubFields?.duration,
			category: pornHubFields?.category,
			uploadDate: pornHubFields?.uploadDate,
			views: pornHubFields?.views,
			likes: pornHubFields?.likes,
			tags: pornHubFields?.tags,
			videoMetadata: pornHubFields.videoMetadata,
			user: pornHubFields?.user,
			userAvatar: pornHubFields?.userAvatar,
			totalVideos: pornHubFields?.totalVideos,
			totalSubscribers: pornHubFields?.totalSubscribers
		};
	}

	private async getVideos(request: PornHubExecArgs, videoUrls: string[]): Promise<PornHubVideoOutput[]> {
		const videos: PornHubVideoOutput[] = [];

		for (const url of videoUrls) {
			const chunkRequest: PornHubExecArgs = {
				...request,
				entryUrl: url,
				referer: url,
				method: PornHubMethods.getVideo
			};

			const metadata = (await super.transform(url, chunkRequest)) as DefaultExecutionResult<Partial<PornHubOutput>>;

			videos.push({ ...this.toVideoOutput(chunkRequest, metadata), user: request.videosArgs?.username as string });
		}

		return videos.filter((v) => Boolean(v?.videoMetadata?.videoUrl));
	}

	private toVideosOutput(request: PornHubExecArgs, metadata: DefaultExecutionResult<Partial<PornHubOutput>>): PornHubVideosOutput {
		const pornHubFields = metadata?.customFields as PornHubOutput;
		let videoUrls = Array.from(new Set(metadata.anchors.filter((v) => v.match(/view_video\.php\?viewkey=([a-zA-Z0-9]{13})$/))));
		if (request?.videosArgs?.format === 'path') videoUrls = videoUrls.map((url) => url.split('=').pop() ?? url);

		return {
			videoUrls,
			username: request.videosArgs?.username as string,
			currentPage: pornHubFields?.currentPage ?? '1',
			fetchedVideos: videoUrls?.length?.toString() ?? '0'
		};
	}

	private toChannelsOutput(request: PornHubExecArgs, metadata: DefaultExecutionResult<Partial<PornHubOutput>>): PornHubChannelsOutput[] {
		return (metadata.customFields?.channels as PornHubChannelsOutput[]) ?? [];
	}
}
