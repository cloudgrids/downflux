import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { XGroovyExecArgs, XGroovyOutput } from './XGroovyContracts';

/**
 * Builds downloadable XGroovy pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class XGroovyPipeline extends BasePipeline<XGroovyExecArgs, XGroovyOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<XGroovyOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'XGroovy';
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

		return this.pathBuilder.join(
			prefix,
			this.pathBuilder.spaceNormalizer(metadata.uploaderId?.split('/')?.pop() || 'xgroovy_uploader'),
			mediaSegment
		);
	}

	protected override mappings(metadata: XGroovyOutput, request: XGroovyExecArgs): PipelineMappings {
		const videoId = this.pathBuilder.spaceNormalizer(metadata.title);

		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => videoId
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => videoId
			}),
			this.createMappings(
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => videoId
				}
			)
		];
	}
}
