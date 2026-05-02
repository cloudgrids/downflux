import { detectResourceType, detectVideoQuality, pathBuilder } from '../helpers';
import { IdentifierContext, MediaType, OkPornExecArgs, OkPornOutput, PipelineExtractedItem, PipelineItem, VideoQuality } from '../util';
import { BasePipeline } from './BasePipeline';

export class OkPornPipeline extends BasePipeline<OkPornExecArgs, OkPornOutput> {
	public override build(metadata: OkPornOutput, request: OkPornExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map((item) => ({
					downloadUrl: item.url,
					sourceUrl: request.entryUrl,
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

	protected override buildIdentifier(ctx: IdentifierContext<OkPornOutput>): string {
		const { mediaType, metadata, id } = ctx;
		const prefix = 'okporn';
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

		return pathBuilder(prefix, metadata.modelName?.replace(/\s+/g, '-')?.toLowerCase() ?? 'unknown', mediaSegment);
	}

	protected extract(request: OkPornExecArgs, metadata: OkPornOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata.albumImages?.length) {
			metadata.albumImages.filter(Boolean).forEach((url) => urls.add({ mediaType: MediaType.ALBUMS, url }));
		}

		if (metadata.videoSources?.length) {
			this.filterByQuality(metadata.videoSources.filter(Boolean), {
				allowedQualities: request.videoArgs?.allowedQualities as VideoQuality[],
				getQuality: (source) => source.quality
			}).forEach(({ url }) => urls.add({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata.videoAlbum?.albumImages.length) {
			metadata.videoAlbum.albumImages.filter(Boolean).forEach((url) => urls.add({ mediaType: MediaType.VIDEO_ALBUM, url }));
		}

		if (metadata.videoPoster) urls.add({ mediaType: MediaType.VIDEO_POSTER, url: metadata.videoPoster });

		if (metadata.albumThumbnail) urls.add({ mediaType: MediaType.ALBUM_PREVIEW, url: metadata.albumThumbnail });

		if (metadata.videoCards?.length) {
			this.filterByQuality(
				metadata.videoCards.filter(Boolean).map((u) => ({
					url: u.preview,
					quality: detectVideoQuality(u.preview),
					mediaType: MediaType.VIDEO_PREVIEW,
					id: u.videoId
				})),
				{
					allowedQualities: request.videoArgs?.allowedQualities as VideoQuality[],
					getQuality: (source) => source.quality
				}
			).forEach((item) => urls.add({ mediaType: item.mediaType, url: item.url, id: item.id }));
		}

		if (metadata.videoCards?.length) {
			metadata.videoCards
				.filter(Boolean)
				.forEach((card) => urls.add({ mediaType: MediaType.VIDEO_SCREENSHOT, url: card.screenShot, id: card.videoId }));
		}

		return Array.from(urls);
	}
}
