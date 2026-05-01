import { detectResourceType, pathBuilder } from '../helpers';
import {
	IdentifierContext,
	MediaType,
	PipelineExtractedItem,
	PipelineItem,
	WallHavenExecArgs,
	WallHavenOutput,
	WallHavenThumbnailQuality,
	WallHavenWallPaperOutput
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
					baseUrl: request.entryUrl,
					service: request.service,
					identifier: {
						mediaType: item.mediaType,
						...detectResourceType(item.url),
						key: this.buildIdentifier({
							mediaType: item.mediaType,
							metadata,
							url: item.url,
							id: item.id
						})
					}
				}))
			)
		);
	}

	protected override buildIdentifier(ctx: IdentifierContext<WallHavenWallPaperOutput>): string {
		const { mediaType, metadata, id } = ctx;
		const prefix = 'wallhaven';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.IMAGES:
				mediaSegment = `${MediaType.IMAGES}/${metadata?.id ?? id}`;
				break;

			default:
				mediaSegment = 'misc';
		}

		return pathBuilder(prefix, metadata.uploader?.replace(/\s+/g, '-')?.toLowerCase() ?? 'unknown', mediaSegment);
	}

	protected override extract(request: WallHavenExecArgs, metadata: WallHavenOutput): PipelineExtractedItem[] {
		const urls: PipelineExtractedItem[] = [];

		if (metadata.thumbnails?.length) {
			this.filterByQuality(metadata.thumbnails, {
				allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
				getQuality: (thumb) => thumb.quality
			}).forEach((thumb) => urls.push({ mediaType: MediaType.IMAGES, url: thumb.url, id: thumb.id }));
		}

		if (metadata.wallPapers?.length) {
			metadata.wallPapers.forEach((wp) => {
				this.filterByQuality(wp.thumbnails, {
					allowedQualities: request.thumbQualities as WallHavenThumbnailQuality[],
					getQuality: (wallpaper) => wallpaper.quality
				}).forEach((thumb) => urls.push({ mediaType: MediaType.IMAGES, url: thumb.url, id: thumb.id }));
			});
		}

		return urls;
	}
}
