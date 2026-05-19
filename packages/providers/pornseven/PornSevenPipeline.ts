import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { PornSevenExecArgs, PornSevenOutput } from './PornSevenContracts';

/**
 * Builds downloadable PornSeven pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class PornSevenPipeline extends BasePipeline<PornSevenExecArgs, PornSevenOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PornSevenOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornSeven';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader || 'unknown_uploader'), mediaSegment);
	}

	protected override mappings(metadata: PornSevenOutput, request: PornSevenExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getUrl: (video) => video.url,
					getMedia: () => MediaType.VIDEOS,
					getId: () => metadata.videoId ?? 'unknown'
				}
			),
			this.createMappings(
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getUrl: (video) => video.url,
					getMedia: () => MediaType.VIDEOS,
					getId: () => metadata.videoId ?? 'unknown'
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getUrl: (poster) => poster,
				getMedia: () => MediaType.VIDEO_POSTER,
				getId: () => metadata.videoId ?? 'unknown'
			})
		];
	}
}
