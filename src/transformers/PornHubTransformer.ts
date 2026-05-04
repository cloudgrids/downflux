import {
	DefaultExtractorResult,
	PornHubExecArgs,
	PornHubMethods,
	PornHubModelVideosOutput,
	PornHubOutput,
	PornHubVideoOutput
} from '../util';
import { BaseTransformer } from './BaseTransformer';

export class PornHubTransformer extends BaseTransformer<
	PornHubExecArgs,
	PornHubVideoOutput | PornHubModelVideosOutput | DefaultExtractorResult
> {
	public async transform(
		url: string,
		request: PornHubExecArgs
	): Promise<PornHubVideoOutput | PornHubModelVideosOutput | DefaultExtractorResult<unknown>> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<PornHubOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornHubMethods.getVideo:
				return this.toVideoOutput(request, metadata);

			case PornHubMethods.getModelVideos:
				return this.toModelVideosOutput(request, metadata);

			default:
				return metadata;
		}
	}

	private toVideoOutput(request: PornHubExecArgs, metadata: DefaultExtractorResult<Partial<PornHubOutput>>): PornHubVideoOutput {
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
			this.emitExtractProgress(chunkRequest, 'EXTRACTING', url);

			const metadata = (await super.transform(url, chunkRequest)) as DefaultExtractorResult<Partial<PornHubOutput>>;

			this.emitExtractProgress(chunkRequest, 'EXTRACTED', url);

			videos.push({ ...this.toVideoOutput(chunkRequest, metadata), user: request.modelVideosArgs?.username as string });
		}

		return videos.filter((v) => Boolean(v?.videoMetadata?.videoUrl));
	}

	private toModelVideosOutput(
		request: PornHubExecArgs,
		metadata: DefaultExtractorResult<Partial<PornHubOutput>>
	): PornHubModelVideosOutput {
		const pornHubFields = metadata?.customFields as PornHubOutput;
		let videoUrls = Array.from(new Set(metadata.anchors.filter((v) => v.match(/view_video\.php\?viewkey=([a-zA-Z0-9]{13})$/))));
		if (request?.modelVideosArgs?.format === 'path') videoUrls = videoUrls.map((url) => url.split('=').pop() ?? url);

		return {
			videoUrls,
			username: request.modelVideosArgs?.username as string,
			currentPage: pornHubFields?.currentPage ?? '0',
			fetchedVideos: videoUrls?.length?.toString() ?? '0'
		};
	}
}
