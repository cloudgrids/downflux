import { detectResourceType, pathBuilder } from '../helpers';
import { IdentifierContext, MediaType, PipelineExtractedItem, PipelineItem, PornHubExecArgs, PornHubOutput, ServiceType } from '../util';
import { BasePipeline } from './BasePipeline';

export class PornHubPipeline extends BasePipeline<PornHubExecArgs, PornHubOutput> {
	public override build(metadata: PornHubOutput, request: PornHubExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map((item) => ({
					downloadUrl: item.url,
					sourceUrl: request.entryUrl,
					service: request.service,
					identifier: {
						mediaType: item.mediaType,
						...detectResourceType(item.url, ServiceType.PornHub),
						key: this.buildIdentifier({
							mediaType: item.mediaType,
							metadata,
							url: item.url,
							id: item.id
						})
					}
				}))
			)
		);
	}

	protected override buildIdentifier(ctx: IdentifierContext<PornHubOutput>): string {
		const { mediaType, metadata, id } = ctx;
		const prefix = 'pornhub';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
			case MediaType.VIDEO_PREVIEW:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.AVATAR:
				mediaSegment = `${MediaType.AVATAR}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
				break;
		}
		return pathBuilder(prefix, metadata.user?.replace(/\s+/g, '-')?.toLowerCase() ?? 'unknown', mediaSegment);
	}

	protected override extract(request: PornHubExecArgs, metadata: PornHubOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata.videos?.length) {
			metadata.videos.forEach((video) => {
				urls.add({
					url: video.videoUrl,
					mediaType: MediaType.VIDEOS,
					id: request.viewKey
				});
			});
		}

		if (metadata?.userAvatar) {
			urls.add({
				url: metadata.userAvatar,
				mediaType: MediaType.AVATAR
			});
		}

		if (metadata.thumbnailUrl) {
			urls.add({
				url: metadata.thumbnailUrl,
				mediaType: MediaType.VIDEO_PREVIEW,
				id: request.entryUrl.split('=').pop() ?? 'unknown'
			});
		}

		return Array.from(urls);
	}
}
