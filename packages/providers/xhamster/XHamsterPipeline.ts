import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType, VideoQuality } from '@types';
import { XHamsterExecArgs, XHamsterOutput } from './XHamsterContracts';

/**
 * Builds downloadable XHamster pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class XHamsterPipeline extends BasePipeline<XHamsterExecArgs, XHamsterOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<XHamsterOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'xhamster';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.username), mediaSegment);
	}

	protected override mappings(metadata: XHamsterOutput, request: XHamsterExecArgs): PipelineMappings {
		return [
			this.createMappings(
				metadata?.defaultVideoUrl || metadata?.masterPlaylistUrl
					? [request.allowedVideoQuality === VideoQuality.Q480 ? metadata.defaultVideoUrl : metadata.masterPlaylistUrl]
					: undefined,
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (url) => url,
					getId: () => this.pathBuilder.spaceNormalizer(metadata.title)
				}
			),
			this.createMappings(metadata?.thumbnailUrl ? [metadata.thumbnailUrl] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (url) => url,
				getId: () => this.pathBuilder.spaceNormalizer(metadata.title)
			})
		];
	}
}
