import { detectResourceType, pathBuilder } from '../helpers';
import {
	IdentifierContext,
	MediaType,
	PipelineExtractedItem,
	PipelineItem,
	WallHavenExecArgs,
	WallHavenOutput,
	WallHavenThumbnailQuality,
	WallHavenUserFavoriteCollection
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
						...detectResourceType(item.url),
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
		const { mediaType, metadata, id, username } = ctx;
		const prefix = 'wallhaven';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.IMAGES:
				mediaSegment = `${mediaType}/${metadata?.id ?? id}`;
				break;
			case MediaType.FAVORITES:
				mediaSegment = `${mediaType}/${metadata?.id ?? id}/${MediaType.THUMBNAILS}`;
				break;

			case MediaType.COVER:
				mediaSegment = `${MediaType.FAVORITES}/${metadata?.id ?? id}/${mediaType}`;
				break;

			default:
				mediaSegment = 'misc';
		}

		return pathBuilder(prefix, username ?? metadata.uploader?.replace(/\s+/g, '-')?.toLowerCase() ?? 'unknown', mediaSegment);
	}

	protected override extract(request: WallHavenExecArgs, metadata: WallHavenOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const collections = Array.isArray(metadata) ? (metadata as WallHavenUserFavoriteCollection[]) : [];

		if (metadata.thumbnails?.length) {
			this.filterByQuality(metadata.thumbnails, {
				allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
				getQuality: (thumb) => thumb.quality
			}).forEach((thumb) => urls.add({ mediaType: MediaType.IMAGES, url: thumb.url, id: thumb.id }));
		}

		if (metadata.wallPapers?.length) {
			metadata.wallPapers.forEach((wp) => {
				this.filterByQuality(wp.thumbnails, {
					allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
					getQuality: (wallpaper) => wallpaper.quality
				}).forEach((thumb) => urls.add({ mediaType: MediaType.IMAGES, url: thumb.url, id: thumb.id }));
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
						id: collection.id,
						username: collection.uploader,
						mediaType: MediaType.FAVORITES
					})
				);
			});

			collections.forEach((collection) => {
				if (collection.backgroundUrl) {
					urls.add({
						id: collection.id,
						mediaType: MediaType.COVER,
						username: collection.uploader,
						url: collection.backgroundUrl
					});
				}
			});
		}

		return Array.from(urls);
	}
}
