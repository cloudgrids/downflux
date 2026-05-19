import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { ItsPornExecArgs, ItsPornOutput } from './ItsPornContracts';

export class ItsPornPipeline extends BasePipeline<ItsPornExecArgs, ItsPornOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<ItsPornOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'ItsPorn';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_TIMELINES:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${MediaType.VIDEO_TIMELINES}`;
				break;

			case MediaType.VIDEO_PREVIEWS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata?.uploader || 'unknown_uploader'), mediaSegment);
	}

	protected override mappings(metadata: ItsPornOutput, request: ItsPornExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (url) => url.quality
				}),
				{
					getUrl: ({ url }) => url,
					getMedia: () => MediaType.VIDEOS,
					getId: () => metadata.videoId
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getUrl: (url) => url,
				getMedia: () => MediaType.VIDEO_POSTER,
				getId: () => metadata.videoId
			}),
			this.createMappings(metadata?.previews, {
				getUrl: (url) => url,
				getMedia: () => MediaType.VIDEO_PREVIEWS,
				getId: () => metadata.videoId
			}),
			this.createMappings(metadata?.timelineScreens, {
				getUrl: (url) => url,
				getMedia: () => MediaType.VIDEO_TIMELINES,
				getId: () => metadata.videoId
			})
		];
	}
}
