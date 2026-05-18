import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { XDeguExecArgs, XDeguOutput } from './XDeguContracts';

export class XDeguPipeline extends BasePipeline<XDeguExecArgs, XDeguOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<XDeguOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'XDegu';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_PREVIEWS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(
			prefix,
			this.pathBuilder.spaceNormalizer(metadata?.starred?.join('_') ?? 'unknown_uploader'),
			mediaSegment
		);
	}

	protected override mappings(metadata: XDeguOutput, request: XDeguExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (url) => url.quality
				}),
				{
					getUrl: ({ url }) => url,
					getMedia: () => MediaType.VIDEOS,
					getId: () => metadata.videoId
				}
			),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getUrl: (url) => url,
				getMedia: () => MediaType.VIDEO_POSTER,
				getId: () => metadata.videoId
			}),
			this.createMappings(metadata?.previews, {
				getUrl: (url) => url,
				getMedia: () => MediaType.VIDEO_PREVIEWS,
				getId: () => metadata.videoId
			})
		];
	}
}
