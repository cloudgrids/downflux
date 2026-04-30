import { pathBuilder } from '../helpers/PathBuilder';
import { OkPornExecArgs, OkPornOutput, PipelineItem } from '../util';
import { MediaType } from '../util/enums/common/MediaType';
import { BasePipeline } from './BasePipeline';

export class OkPornPipeline extends BasePipeline<OkPornExecArgs, OkPornOutput> {
	public override build(metadata: OkPornOutput, request: OkPornExecArgs): PipelineItem[] {
		const items: PipelineItem[] = [];
		const extracted = this.extract(metadata);

		for (const { mediaType, url, id } of extracted) {
			items.push({
				downloadUrl: url,
				baseUrl: metadata.baseUrl,
				service: request.service,
				identifier: {
					mediaType,
					...this.detectResourceType(url),
					key: this.buildIdentifier(mediaType, metadata, id)
				}
			});
		}

		return this.sliceByMaxDownloads(this.filterByExt(items, request), request);
	}

	protected override buildIdentifier(mediaType: MediaType, metadata: OkPornOutput, id?: string): string {
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

	protected extract(metadata: OkPornOutput): { mediaType: MediaType; url: string; id?: string }[] {
		const urls: { mediaType: MediaType; url: string; id?: string }[] = [];

		if (metadata.albumImages?.length) {
			metadata.albumImages.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.ALBUMS, url }));
		}

		if (metadata.videoSources?.length) {
			metadata.videoSources.filter(Boolean).forEach(({ url }) => urls.push({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata.videoAlbum?.albumImages.length) {
			metadata.videoAlbum.albumImages.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.VIDEO_ALBUM, url }));
		}

		if (metadata.videoPoster) urls.push({ mediaType: MediaType.VIDEO_POSTER, url: metadata.videoPoster });

		if (metadata.albumThumbnail) urls.push({ mediaType: MediaType.ALBUM_PREVIEW, url: metadata.albumThumbnail });

		if (metadata.videoCards?.length) {
			metadata.videoCards
				.filter(Boolean)
				.forEach((card) => urls.push({ mediaType: MediaType.VIDEO_PREVIEW, url: card.preview, id: card.videoId }));
		}

		if (metadata.videoCards?.length) {
			metadata.videoCards
				.filter(Boolean)
				.forEach((card) => urls.push({ mediaType: MediaType.VIDEO_SCREENSHOT, url: card.screenShot, id: card.videoId }));
		}

		return urls;
	}
}
