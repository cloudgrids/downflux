import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { PornIdExecArgs, PornIdOutput } from './PornIdContracts';

export class PornIdPipeline extends BasePipeline<PornIdExecArgs, PornIdOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PornIdOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornId';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_PREVIEWS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_TIMELINES:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: PornIdOutput, request: PornIdExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.id
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => metadata.id
			}),
			this.createMappings(metadata?.previews ? metadata.previews : undefined, {
				getMedia: () => MediaType.VIDEO_PREVIEWS,
				getUrl: (preview) => preview,
				getId: () => metadata.id
			}),
			this.createMappings(metadata?.timelineScreens ? metadata.timelineScreens : undefined, {
				getMedia: () => MediaType.VIDEO_TIMELINES,
				getUrl: (timeline) => timeline,
				getId: () => metadata.id
			}),
			this.createMappings(
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.id
				}
			)
		];
	}
}
