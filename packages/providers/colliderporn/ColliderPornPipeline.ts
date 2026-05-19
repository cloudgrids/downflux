import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { ColliderPornExecArgs, ColliderPornOutput } from './ColliderPornContracts';

/**
 * Builds downloadable ColliderPorn pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class ColliderPornPipeline extends BasePipeline<ColliderPornExecArgs, ColliderPornOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<ColliderPornOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'ColliderPorn';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${MediaType.VIDEO_POSTER}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: ColliderPornOutput, request: ColliderPornExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.videoId
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => metadata.videoId
			}),
			this.createMappings(
				this.filterByQuality(metadata.videos.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.videoId
				}
			)
		];
	}
}
