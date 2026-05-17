import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { MegaTubeExecArgs, MegaTubeOutput } from './MegaTubeContracts';

export class MegaTubePipeline extends BasePipeline<MegaTubeExecArgs, MegaTubeOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<MegaTubeOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'MegaTube';
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

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: MegaTubeOutput, request: MegaTubeExecArgs): PipelineMappings {
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
			)
		];
	}
}
