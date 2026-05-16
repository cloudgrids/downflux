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
			case MediaType.VIDEO_POSTER:
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

		let viewKey: string;

		try {
			viewKey = new URL(request.entryUrl).searchParams.get('viewkey') ?? '';
		} catch {
			viewKey = request.entryUrl.split('=').pop() ?? 'unknown';
		}

		if (!viewKey) viewKey = request.entryUrl.split('=').pop() ?? 'unknown';

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: viewKey
				});
			});
		}

		if (metadata?.videos?.hls?.length) {
			this.filterByQuality(metadata.videos.hls, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: viewKey
				});
			});
		}

		if (metadata?.userAvatar) {
			urls.add({
				url: metadata.userAvatar,
				mediaType: MediaType.AVATAR
			});
		}

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: viewKey
			});
		}

		if (metadata?.channelThumbnail) {
			urls.add({
				url: metadata.channelThumbnail,
				mediaType: MediaType.CHANNELS,
				id: this.pathBuilder.spaceNormalizer(metadata.channelName ?? 'unknown')
			});
		}

		return Array.from(urls);
	}
}
