import { detectResourceType, pathBuilder } from '../helpers';
import { IdentifierContext, MediaType, PipelineExtractedItem, PipelineItem, PornHubExecArgs, PornHubOutput } from '../util';
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
						...detectResourceType(item.url),
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
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_PREVIEW:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
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
			this.filterByQuality(metadata.videos, {
				allowedQualities: [request.allowedVideoQuality],
				getQuality: (video) => `${video.quality}p`
			}).forEach((video) => {
				urls.add({
					url: video.videoUrl,
					mediaType: MediaType.VIDEOS,
					id:
						video.videoUrl
							.split('/')
							.filter(Boolean)
							.find((url) => url.endsWith('.mp4'))
							?.split('.')[0] ?? video.videoUrl
				});
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
