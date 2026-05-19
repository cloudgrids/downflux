import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { inferVideoQuality } from '@shared';
import { MediaType } from '@types';
import { PerfectGirlsExecArgs, PerfectGirlsOutput } from './PerfectGirlsContracts';

/**
 * Builds downloadable PerfectGirls pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class PerfectGirlsPipeline extends BasePipeline<PerfectGirlsExecArgs, PerfectGirlsOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PerfectGirlsOutput>): string {
		const { mediaType, metadata, id, url } = ctx;
		const prefix = url.includes('perfectgirls.xxx') ? 'perfectgirls' : 'perfectdamen';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.ALBUMS:
				mediaSegment = `${MediaType.ALBUMS}/${metadata.albumId}`;
				break;

			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${metadata.videoId}`;
				break;

			case MediaType.VIDEO_ALBUM:
				mediaSegment = `${MediaType.VIDEOS}/${metadata.videoId}/${mediaType}/${metadata.videoAlbum?.albumId}`;
				break;

			case MediaType.VIDEO_PREVIEW:
				mediaSegment = `${MediaType.VIDEOS}/${metadata?.videoId ?? id}/${mediaType}`;
				break;

			case MediaType.VIDEO_SCREENSHOT:
				mediaSegment = `${MediaType.VIDEOS}/${metadata?.videoId ?? id}/${mediaType}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${metadata?.videoId}/${mediaType}`;
				break;

			case MediaType.ALBUM_PREVIEW:
				mediaSegment = `${MediaType.ALBUMS}/${metadata.albumId}/${mediaType}`;
				break;

			default:
				mediaSegment = 'misc';
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.author || metadata.modelName), mediaSegment);
	}

	protected override mappings(metadata: PerfectGirlsOutput, request: PerfectGirlsExecArgs): PipelineMappings {
		return [
			this.createMappings(
				this.filterByQuality(metadata.videos?.mp4, {
					allowedQuality: request.videoArgs?.quality,
					getQuality: (source) => source.quality
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
					allowedQuality: request.videoArgs?.quality,
					getQuality: (source) => source.quality
				}),
				{
					getMedia: () => MediaType.VIDEOS,
					getUrl: (video) => video.url,
					getId: () => metadata.videoId
				}
			),
			this.createMappings(metadata?.albumImages, {
				getMedia: () => MediaType.ALBUMS,
				getUrl: (url) => url
			}),
			this.createMappings(metadata?.videoAlbum?.albumImages, {
				getMedia: () => MediaType.VIDEO_ALBUM,
				getUrl: (url) => url
			}),
			this.createMappings(metadata?.albumThumbnail ? [metadata.albumThumbnail] : undefined, {
				getMedia: () => MediaType.ALBUM_PREVIEW,
				getUrl: (url) => url,
				getId: () => metadata.albumId
			}),
			this.createMappings(
				metadata?.videoCards?.map((card) => ({
					url: card.preview,
					quality: inferVideoQuality(card.preview),
					mediaType: MediaType.VIDEO_PREVIEW,
					id: card.videoId
				})) ?? [],
				{
					getMedia: (item) => item.mediaType,
					getUrl: (item) => item.url,
					getId: (item) => item.id
				}
			),
			this.createMappings(
				metadata?.videoCards?.map((card) => ({
					url: card.screenShot,
					mediaType: MediaType.VIDEO_SCREENSHOT,
					id: card.videoId
				})) ?? [],
				{
					getMedia: (item) => item.mediaType,
					getUrl: (item) => item.url,
					getId: (item) => item.id
				}
			)
		];
	}
}
