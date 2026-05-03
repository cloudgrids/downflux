import { DefaultExtractorResult, PornHubExecArgs, PornHubMethods, PornHubOutput, PornHubVideoOutput } from '../util';
import { BaseTransformer } from './BaseTransformer';

export class PornHubTransformer extends BaseTransformer<PornHubExecArgs, PornHubVideoOutput | DefaultExtractorResult> {
	public async transform(url: string, request: PornHubExecArgs): Promise<PornHubVideoOutput | DefaultExtractorResult<unknown>> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<PornHubOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornHubMethods.getVideo:
				return this.toVideoOutput(request, metadata);

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
			videos: pornHubFields?.videos,
			user: pornHubFields?.user,
			userAvatar: pornHubFields?.userAvatar,
			totalVideos: pornHubFields?.totalVideos,
			totalSubscribers: pornHubFields?.totalSubscribers
		};
	}
}
