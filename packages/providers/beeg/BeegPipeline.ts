import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMapping } from '@contracts';
import { MediaType } from '@types';
import { BeegExecArgs, BeegOutput } from './BeegContracts';

export class BeegPipeline extends BasePipeline<BeegExecArgs, BeegOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<BeegOutput>): string {
		const { mediaType, id, secondaryId } = ctx;

		const prefix = 'Beeg';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${secondaryId}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, mediaSegment);
	}

	protected override mappings(metadata: BeegOutput, request: BeegExecArgs): Array<PipelineMapping<any>> {
		return [
			this.createMappings(
				this.filterByQuality(metadata?.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item?.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video?.url,
					getId: () => metadata.videoId,
					getSecondaryId: (video) => video?.quality?.toString()
				}
			),
			this.createMappings(
				this.filterByQuality(metadata.videos.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item?.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video?.url,
					getId: () => metadata.videoId,
					getSecondaryId: (video) => video?.quality?.toString()
				}
			)
		];
	}
}
