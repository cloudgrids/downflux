import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { SexVidExecArgs, SexVidOutput } from './SexVidContracts';

export class SexVidPipeline extends BasePipeline<SexVidExecArgs, SexVidOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<SexVidOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'SexVid';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}`;
				break;
			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${mediaType}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.actor), mediaSegment);
	}

	protected override mappings(metadata: SexVidOutput, request: SexVidExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.title
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => metadata.title
			}),
			this.createMappings(
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (video) => video.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.title
				}
			)
		];
	}
}
