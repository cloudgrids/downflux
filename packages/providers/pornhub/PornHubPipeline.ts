import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { PornHubExecArgs, PornHubOutput } from './PornHubContracts';

export class PornHubPipeline extends BasePipeline<PornHubExecArgs, PornHubOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PornHubOutput>): string {
		const { mediaType, metadata, id } = ctx;
		const prefix = 'PornHub';
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

	protected override mappings(metadata: PornHubOutput, request: PornHubExecArgs): PipelineMappings {
		let viewKey: string;

		try {
			viewKey = new URL(request.entryUrl).searchParams.get('viewkey') ?? '';
		} catch {
			viewKey = request.entryUrl.split('=').pop() ?? 'unknown';
		}

		if (!viewKey) viewKey = request.entryUrl.split('=').pop() ?? 'unknown';

		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => viewKey
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => viewKey
			}),
			this.createMappings(
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => viewKey
				}
			),
			this.createMappings(metadata?.userAvatar ? [metadata.userAvatar] : undefined, {
				getMedia: () => MediaType.AVATAR,
				getUrl: (avatar) => avatar,
				getId: () => this.pathBuilder.spaceNormalizer(metadata.user ?? 'unknown')
			}),
			this.createMappings(metadata?.channelThumbnail ? [metadata.channelThumbnail] : undefined, {
				getMedia: () => MediaType.CHANNELS,
				getUrl: (thumb) => thumb,
				getId: () => this.pathBuilder.spaceNormalizer(metadata.channelName ?? 'unknown')
			}),
			this.createMappings(metadata?.channelThumbnail ? [metadata.channelThumbnail] : undefined, {
				getMedia: () => MediaType.CHANNELS,
				getUrl: (cover) => cover,
				getId: () => this.pathBuilder.spaceNormalizer(metadata.channelName ?? 'unknown')
			})
		];
	}
}
