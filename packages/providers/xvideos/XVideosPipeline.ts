import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { XVideosExecArgs, XVideosOutput } from './XVideosContracts';

/**
 * Builds downloadable XVideos pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class XVideosPipeline extends BasePipeline<XVideosExecArgs, XVideosOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<XVideosOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'xvideos';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: XVideosOutput, request: XVideosExecArgs): PipelineMappings {
		const videoId = request.entryUrl.split('/').pop();

		return [
			this.createMappings(metadata?.videoUrl ? [metadata.videoUrl.hls] : undefined, {
				getMedia: () => MediaType.VIDEOS,
				getUrl: (url) => url,
				getId: () => videoId || 'unknown'
			}),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => videoId || 'unknown'
			})
		];
	}
}
