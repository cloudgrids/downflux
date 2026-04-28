import { extname } from 'node:path';
import { MediaType } from '../common/MediaType';
import { DefaultExtractorResult, ExecutionArguments, PipelineItem } from '../types';

export class BasePipeline<T = DefaultExtractorResult> {
	public build(metadata: T, request: ExecutionArguments): PipelineItem[] {
		const items: PipelineItem[] = [];
		const extracted = this.extract(metadata);

		for (const { mediaType, url } of extracted) {
			items.push({
				downloadUrl: url,
				identifier: { mediaType, key: this.buildIdentifier(mediaType, metadata) },
				resourceType: this.detectResourceType(url),
				service: request.service
			});
		}

		return items;
	}

	protected buildIdentifier(mediaType: MediaType, metadata: any): string {
		return `${new URL(metadata.baseUrl).hostname}/${mediaType}/${metadata.urlType}/${new URL(metadata.baseUrl).pathname}`;
	}

	protected extract(metadata: any): { mediaType: MediaType; url: string }[] {
		const urls: { mediaType: MediaType; url: string }[] = [];

		if (metadata.images?.length) {
			metadata.images.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.IMAGES, url }));
		}

		if (metadata.sources?.length) {
			metadata.sources.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata.videoPosters?.length) {
			metadata.videoPosters.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.VIDEO_POSTER, url }));
		}

		if (metadata.divHrefs?.length) {
			metadata.divHrefs.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.OTHER, url }));
		}

		if (metadata.allUrls?.length) {
			metadata.allUrls.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.OTHER, url }));
		}

		return urls;
	}

	protected detectResourceType(url: string): 'image' | 'video' | 'audio' {
		const pathname = extname(url);

		if (/\.(mp4|m3u8|webm|mov|mkv)$/.test(pathname)) return 'video';
		if (/\.(mp3|wav|aac|flac|ogg)$/.test(pathname)) return 'audio';

		return 'image';
	}
}
