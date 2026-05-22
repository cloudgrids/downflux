import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { BlackPornExecArgs, BlackPornOutput } from './BlackPornContracts';

/**
 * Pipeline for organizing BlackPorn video media files.
 * Manages the routing and organization of different media types (videos, posters, etc.).
 *
 * @remarks
 * Pipelines handle the organization of extracted media files into a structured
 * hierarchy. They determine how files are mapped, identified, and stored for later retrieval.
 */
export class BlackPornPipeline extends BasePipeline<BlackPornExecArgs, BlackPornOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<BlackPornOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'BlackPorn';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_TIMELINES:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${MediaType.VIDEO_TIMELINES}`;
				break;

			case MediaType.VIDEO_PREVIEWS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata?.uploader), mediaSegment);
	}

	protected override mappings(metadata: BlackPornOutput, request: BlackPornExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata?.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
				}),
				{
					getUrl: (item) => item.url,
					getId: () => metadata.videoId,
					getMedia: () => MediaType.VIDEOS
				}
			),

			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getUrl: (item) => item,
				getId: () => metadata.videoId,
				getMedia: () => MediaType.VIDEO_POSTER
			})
		];
	}
}
