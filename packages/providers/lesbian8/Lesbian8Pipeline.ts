import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { Lesbian8ExecArgs, Lesbian8Output } from './Lesbian8Contracts';

/**
 * Builds downloadable Lesbian8 pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class Lesbian8Pipeline extends BasePipeline<Lesbian8ExecArgs, Lesbian8Output> {
	protected override buildIdentifier(ctx: IdentifierContext<Lesbian8Output>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'Lesbian8';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${MediaType.VIDEO_POSTER}`;
				break;

			case MediaType.VIDEO_TIMELINES:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${MediaType.VIDEO_TIMELINES}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata?.starred?.join('_')), mediaSegment);
	}

	protected override mappings(metadata: Lesbian8Output, request: Lesbian8ExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
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
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.videoId
				}
			),
			this.createMappings(metadata?.timelineScreens, {
				getMedia: () => MediaType.VIDEO_TIMELINES,
				getUrl: (screen) => screen,
				getId: () => metadata.videoId
			}),
			this.createMappings(metadata?.timelineScreens, {
				getMedia: () => MediaType.VIDEO_TIMELINES,
				getUrl: (screen) => screen,
				getId: () => metadata.videoId
			})
		];
	}
}
