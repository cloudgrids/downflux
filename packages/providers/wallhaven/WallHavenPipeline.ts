import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import path from 'path';
import { WallHavenExecArgs, WallHavenOutput, WallHavenUserFavoriteCollectionsOutput } from './WallHavenContracts';
import { WallHavenMethods, WallHavenThumbnailQuality } from './WallHavenTypes';

/**
 * Builds downloadable WallHaven pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class WallHavenPipeline extends BasePipeline<WallHavenExecArgs, WallHavenOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<WallHavenOutput>): string {
		const { mediaType, metadata, id, username, secondaryId } = ctx;
		const prefix = 'wallhaven';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.UPLOADS:
				mediaSegment = `${MediaType.UPLOADS}/${metadata?.id ?? id}`;
				break;
			case MediaType.FAVORITES:
				mediaSegment = `${MediaType.FAVORITES}/${metadata?.id ?? id}/${MediaType.THUMBNAILS}`;
				break;

			case MediaType.COLLECTION:
				mediaSegment = `${MediaType.FAVORITES}/${metadata?.collectionId ?? secondaryId}/${MediaType.COLLECTION}/${id}`;
				break;

			case MediaType.COVER:
				mediaSegment = `${MediaType.FAVORITES}/${metadata?.collectionId ?? secondaryId}/${MediaType.COVER}/${id}`;
				break;

			default:
				mediaSegment = 'misc';
		}

		return this.pathBuilder.join(prefix, username ?? this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: WallHavenOutput, request: WallHavenExecArgs): PipelineMappings {
		const isFavCollection = request.method === WallHavenMethods.getUserFavoriteCollection;

		return [
			this.createMappings(
				this.filterByQuality(metadata.thumbnails, {
					allowedQuality: request.thumbQuality as WallHavenThumbnailQuality,
					getQuality: (thumb) => thumb.quality
				}),
				{
					getMedia: () => (isFavCollection ? MediaType.COLLECTION : MediaType.UPLOADS),
					getUrl: (thumb) => thumb.url,
					getId: (thumb) => thumb.id,
					getSecondaryId: () => metadata?.collectionId ?? ''
				}
			),
			this.createMappings(
				metadata?.wallPapers?.flatMap((wp) => {
					return this.filterByQuality(wp.thumbnails, {
						allowedQuality: request.thumbQuality as WallHavenThumbnailQuality,
						getQuality: (wallpaper) => wallpaper.quality
					});
				}),
				{
					getMedia: () => MediaType.THUMBNAILS,
					getUrl: (thumb) => thumb.url,
					getId: (thumb) => thumb.id,
					getSecondaryId: () => metadata?.collectionId ?? ''
				}
			)
		];
	}

	protected override extract(request: WallHavenExecArgs, metadata: WallHavenOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const collections = Array.isArray(metadata) ? (metadata as WallHavenUserFavoriteCollectionsOutput[]) : [];

		if (collections?.length) {
			collections.flatMap((collection) => {
				return this.filterByQuality(collection.thumbnails, {
					allowedQuality: request.thumbQuality as WallHavenThumbnailQuality,
					getQuality: (thumb) => thumb.quality
				}).forEach((thumb) =>
					urls.add({
						url: thumb.url,
						id: thumb.id,
						username: collection.uploader,
						mediaType: MediaType.FAVORITES,
						secondaryId: collection.id
					})
				);
			});

			collections.forEach((collection) => {
				if (collection.backgroundUrl) {
					urls.add({
						id: path.parse(collection.backgroundUrl).name,
						mediaType: MediaType.COVER,
						username: collection.uploader,
						url: collection.backgroundUrl,
						secondaryId: collection.id
					});
				}
			});
		}

		return Array.from(urls);
	}
}
