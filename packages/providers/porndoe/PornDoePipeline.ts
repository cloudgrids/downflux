import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { PornDoeExecArgs, PornDoeOutput } from './PornDoeContracts';

/**
 * Builds downloadable PornDoe pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class PornDoePipeline extends BasePipeline<PornDoeExecArgs, PornDoeOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PornDoeOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornDoe';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_PREVIEW:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: PornDoeOutput, request: PornDoeExecArgs): PipelineMappings {
		const videoId = this.pathBuilder.spaceNormalizer(request.entryUrl.split('/').filter(Boolean).pop() as string);

		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
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
			this.createMappings(metadata?.preview ? [metadata.preview] : undefined, {
				getMedia: () => MediaType.VIDEO_PREVIEW,
				getUrl: (preview) => preview,
				getId: () => videoId
			}),
			this.createMappings(
				this.filterByQuality(metadata.videos?.hls, {
					allowedQuality: request.allowedVideoQuality,
					getQuality: (item) => item.quality
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
