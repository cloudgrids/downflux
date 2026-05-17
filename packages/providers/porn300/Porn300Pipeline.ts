import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { ImageExtension, MediaType } from '@types';
import { Porn300ExecArgs, Porn300Output } from './Porn300Contracts';

export class Porn300Pipeline extends BasePipeline<Porn300ExecArgs, Porn300Output> {
	protected override buildIdentifier(ctx: IdentifierContext<Porn300Output>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Porn300';
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

		return this.pathBuilder.join(prefix, mediaSegment);
	}

	protected override mappings(metadata: Porn300Output, request: Porn300ExecArgs): PipelineMappings {
		const videoId = request.entryUrl.split('/').filter(Boolean).pop() as string;

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
				getId: () => videoId,
				getExt: (poster) => poster.split('/').pop()?.split('.').pop() as ImageExtension
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
