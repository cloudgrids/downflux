import { BasePipeline } from '@base';
import { IdentifierContext } from '@contracts';
import { MediaType } from '@types';
import { PornsOkExecArgs, PornsOkOutput } from './PornsOkContracts';

export class PornsOkPipeline extends BasePipeline<PornsOkExecArgs, PornsOkOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PornsOkOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornsOk';
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

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.starredBy?.[0]), mediaSegment);
	}

	protected override mappings(metadata: PornsOkOutput, request: PornsOkExecArgs) {
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
