import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { CumLouderExecArgs, CumLouderOutput } from './CumLouderContracts';

export class CumLouderPipeline extends BasePipeline<CumLouderExecArgs, CumLouderOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<CumLouderOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'CumLouder';
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

		return this.pathBuilder.join(prefix, mediaSegment);
	}

	protected override mappings(metadata: CumLouderOutput, request: CumLouderExecArgs): PipelineMappings {
		const videoId = this.pathBuilder.spaceNormalizer(
			request.entryUrl.match(/porn-video\/([^./]+)/i)?.[1] || (metadata.pageUrl.split('/').filter(Boolean).pop() as string)
		);

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
