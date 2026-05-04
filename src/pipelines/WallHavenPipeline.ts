import path from 'path';
import { detectResourceType, pathBuilder } from '../helpers';
import {
	IdentifierContext,
	MediaType,
	PipelineExtractedItem,
	PipelineItem,
	ServiceType,
	WallHavenExecArgs,
	WallHavenMethods,
	WallHavenOutput,
	WallHavenThumbnailQuality,
	WallHavenUserFavoriteCollectionsOutput
} from '../util';
import { BasePipeline } from './BasePipeline';

export class WallHavenPipeline extends BasePipeline<WallHavenExecArgs, WallHavenOutput> {
	public override build(metadata: WallHavenOutput, request: WallHavenExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map((item) => ({
					downloadUrl: item.url,
					service: request.service,
					sourceUrl: request.entryUrl,
					identifier: {
						mediaType: item.mediaType,
						...detectResourceType(item.url, ServiceType.WallHaven),
						key: this.buildIdentifier({
							mediaType: item.mediaType,
							metadata,
							url: item.url,
							id: item.id,
							username: item.username
						})
					}
				}))
			)
		);
	}

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

		return pathBuilder(prefix, username ?? metadata.uploader?.replace(/\s+/g, '-')?.toLowerCase() ?? 'unknown', mediaSegment);
	}

	protected override extract(request: WallHavenExecArgs, metadata: WallHavenOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const collections = Array.isArray(metadata) ? (metadata as WallHavenUserFavoriteCollectionsOutput[]) : [];
		const isFavCollection = request.method === WallHavenMethods.getUserFavoriteCollection;

		if (metadata.thumbnails?.length) {
			this.filterByQuality(metadata.thumbnails, {
				allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
				getQuality: (thumb) => thumb.quality
			}).forEach((thumb) =>
				urls.add({
					mediaType: isFavCollection ? MediaType.COLLECTION : MediaType.UPLOADS,
					secondaryId: metadata?.collectionId,
					url: thumb.url,
					id: thumb.id
				})
			);
		}

		if (metadata.wallPapers?.length) {
			metadata.wallPapers.forEach((wp) => {
				this.filterByQuality(wp.thumbnails, {
					allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
					getQuality: (wallpaper) => wallpaper.quality
				}).forEach((thumb) =>
					urls.add({
						mediaType: isFavCollection ? MediaType.COLLECTION : MediaType.UPLOADS,
						url: thumb.url,
						id: thumb.id,
						secondaryId: metadata?.collectionId
					})
				);
			});
		}

		if (collections?.length) {
			collections.forEach((collection) => {
				this.filterByQuality(collection.thumbnails, {
					allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
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
