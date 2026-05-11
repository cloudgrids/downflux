import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { PornHubExecArgs, PornHubOutput } from './PornHubContracts';

export class PornHubPipeline extends BasePipeline<PornHubExecArgs, PornHubOutput> {
	public override build(metadata: PornHubOutput, request: PornHubExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map((item) => ({
					downloadUrl: item.url,
					sourceUrl: request.entryUrl,
					provider: request.provider,
					identifier: {
						mediaType: item.mediaType,
						...this.fileManager.detectResourceType(item.url, request),
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

			case MediaType.CHANNELS:
				mediaSegment = `${mediaType}/${MediaType.COVER}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}
		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.user ?? id), mediaSegment);
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

		if (metadata?.channelThumbnail) {
			urls.add({
				url: metadata.channelThumbnail,
				mediaType: MediaType.CHANNELS,
				id: metadata.channelName.replace(/\s+/g, '_').toLowerCase()
			});
		}

		return Array.from(urls);
	}
}
