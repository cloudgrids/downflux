import { MediaType } from '../common/MediaType';
import { pathBuilder } from '../common/PathBuilder';
import { OkPornOutput } from '../services';
import { ExecutionArguments, PipelineItem } from '../types';
import { BasePipeline } from './BasePipeline';

export class OkPornPipeline extends BasePipeline<OkPornOutput> {
	public override build(metadata: OkPornOutput, request: ExecutionArguments): PipelineItem[] {
		const items: PipelineItem[] = [];
		const extracted = this.extract(metadata);

		for (const { mediaType, url } of extracted) {
			items.push({
				downloadUrl: url,
				baseUrl: metadata.baseUrl,
				service: request.service,
				identifier: {
					mediaType,
					...this.detectResourceType(url),
					key: this.buildIdentifier(mediaType, metadata)
				}
			});
		}

		return this.filterByExt(items, request);
	}

	protected override buildIdentifier(mediaType: MediaType, metadata: OkPornOutput): string {
		const prefix = 'okporn';
		let typeSegment: string;

		switch (mediaType) {
			case MediaType.ALBUMS:
				typeSegment = `${mediaType}/${metadata.albumId}`;
				break;
			case MediaType.VIDEOS:
				typeSegment = `${mediaType}/${metadata.videoId}`;
				break;
			case MediaType.VIDEO_ALBUM:
				typeSegment = `${MediaType.VIDEOS}/${mediaType}/${metadata.videoAlbum?.albumId}`;
				break;
			case MediaType.VIDEO_POSTER:
				typeSegment = `${MediaType.VIDEOS}/${mediaType}/${metadata.videoId}`;
				break;
			case MediaType.ALBUM_PREVIEW:
				typeSegment = `${MediaType.ALBUMS}/${mediaType}/${metadata.albumId}`;
				break;
			default:
				typeSegment = 'okporn';
		}

		return pathBuilder(prefix, metadata.modelName?.replace(/\s+/g, '-')?.toLowerCase() ?? 'unknown', typeSegment);
	}

	protected extract(metadata: OkPornOutput): { mediaType: MediaType; url: string }[] {
		const urls: { mediaType: MediaType; url: string }[] = [];

		if (metadata.albumImages?.length) {
			metadata.albumImages.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.ALBUMS, url }));
		}

		if (metadata.videoSources?.length) {
			metadata.videoSources.filter(Boolean).forEach(({ url }) => urls.push({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata.videoAlbum?.albumImages.length) {
			metadata.videoAlbum.albumImages.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.VIDEO_ALBUM, url }));
		}

		if (metadata.videoPoster) {
			urls.push({ mediaType: MediaType.VIDEO_POSTER, url: metadata.videoPoster });
		}

		if (metadata.albumThumbnail) {
			urls.push({ mediaType: MediaType.ALBUM_PREVIEW, url: metadata.albumThumbnail });
		}

		return urls;
	}
}
