import { pathBuilder, spaceNormalizer } from '../helpers';
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
						...this.fileService.detectResourceType(item.url, request),
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
		}
		return pathBuilder(prefix, spaceNormalizer(metadata.user), mediaSegment);
	}

	protected override extract(request: PornHubExecArgs, metadata: PornHubOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata.videoMetadata) {
			urls.add({
				url: metadata?.videoMetadata?.videoUrl,
				mediaType: MediaType.VIDEOS,
				id: request.videoArgs?.viewKey
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
