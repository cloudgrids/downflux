import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { inferVideoQuality } from '@shared';
import { MediaType } from '@types';
import { PerfectGirlsExecArgs, PerfectGirlsOutput } from './PerfectGirlsContracts';

export class PerfectGirlsPipeline extends BasePipeline<PerfectGirlsExecArgs, PerfectGirlsOutput> {
	public override build(metadata: PerfectGirlsOutput, request: PerfectGirlsExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map((item) => ({
					downloadUrl: item.url,
					sourceUrl: request.entryUrl,
					provider: request.provider,
					identifier: {
						mediaType: item.mediaType,
						...this.fileManager.detectResourceType(item.url, request),
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

	protected extract(request: PerfectGirlsExecArgs, metadata: PerfectGirlsOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.albumImages?.length) {
			metadata.albumImages.filter(Boolean).forEach((url) => urls.add({ mediaType: MediaType.ALBUMS, url }));
		}

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4.filter(Boolean), {
				allowedQuality: request.videoArgs?.quality,
				getQuality: (source) => source.quality
			}).forEach(({ url }) => urls.add({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata?.videos?.hls?.length) {
			this.filterByQuality(metadata.videos.hls.filter(Boolean), {
				allowedQuality: request.videoArgs?.quality,
				getQuality: (source) => source.quality
			}).forEach(({ url }) => urls.add({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata?.videoAlbum?.albumImages.length) {
			metadata.videoAlbum.albumImages.filter(Boolean).forEach((url) => urls.add({ mediaType: MediaType.VIDEO_ALBUM, url }));
		}

		if (metadata?.poster) urls.add({ mediaType: MediaType.VIDEO_POSTER, url: metadata.poster });
		if (metadata?.albumThumbnail) urls.add({ mediaType: MediaType.ALBUM_PREVIEW, url: metadata.albumThumbnail });

		if (metadata?.videoCards?.length) {
			this.filterByQuality(
				metadata.videoCards.filter(Boolean).map((u) => ({
					url: u.preview,
					quality: inferVideoQuality(u.preview),
					mediaType: MediaType.VIDEO_PREVIEW,
					id: u.videoId
				})),
				{
					allowedQuality: request.videoArgs?.quality,
					getQuality: (source) => source.quality
				}
			).forEach((item) => urls.add({ mediaType: item.mediaType, url: item.url, id: item.id }));
		}

		if (metadata?.videoCards?.length) {
			metadata.videoCards
				.filter(Boolean)
				.forEach((card) => urls.add({ mediaType: MediaType.VIDEO_SCREENSHOT, url: card.screenShot, id: card.videoId }));
		}

		return Array.from(urls);
	}
}
