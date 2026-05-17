import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { HqPornExecArgs, HqPornOutput } from './HqPornContracts';

export class HqPornPipeline extends BasePipeline<HqPornExecArgs, HqPornOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<HqPornOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'HqPorn';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: HqPornOutput, request: HqPornExecArgs): PipelineMappings {
		const videoId = this.pathBuilder.spaceNormalizer(metadata.title.match(/:\s([^HD]+)\s/i)?.[1] || metadata.title);

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
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => videoId
			})
		];
	}
}
