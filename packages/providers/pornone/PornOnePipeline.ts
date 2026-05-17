import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { PornOneExecArgs, PornOneOutput } from './PornOneContracts';

export class PornOnePipeline extends BasePipeline<PornOneExecArgs, PornOneOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PornOneOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornOne';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader || 'unknown'), mediaSegment);
	}

	protected override mappings(metadata: PornOneOutput, request: PornOneExecArgs): PipelineMappings {
		const videoId = request.entryUrl.split('/').filter(Boolean).pop() ?? 'unknown';

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
