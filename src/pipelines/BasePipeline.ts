import { extname } from 'node:path';
import { AllowedExtension, DefaultExtractorResult, ExecutionArguments, MediaType, PipelineItem } from '../util';

export class BasePipeline<T = DefaultExtractorResult> {
	public build(metadata: T, request: ExecutionArguments): PipelineItem[] {
		const items: PipelineItem[] = [];
		const extracted = this.extract(metadata);

		for (const { mediaType, url } of extracted) {
			items.push({
				downloadUrl: url,
				baseUrl: request.entryUrl,
				identifier: {
					mediaType,
					...this.detectResourceType(url),
					key: this.buildIdentifier(mediaType, metadata)
				},
				service: request.service
			});
		}

		return this.filterByExt(items, request);
	}

	protected filterByExt(pipelineItems: PipelineItem[], request: ExecutionArguments): PipelineItem[] {
		if (!request.allowedExtensions?.length) return pipelineItems;

		return pipelineItems.filter((item) => request.allowedExtensions?.includes(item.identifier.extension));
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

	protected detectResourceType(url: string): { mimeType: string; extension: AllowedExtension } {
		const pathname = extname(url);
		const extension = pathname.substring(1).toLowerCase() as AllowedExtension;

		if (/\.(mp4|m3u8|webm|mov|mkv)$/.test(pathname)) return { mimeType: `video/${extension}`, extension };
		else if (/\.(mp3|wav|aac|flac|ogg)$/.test(pathname)) return { mimeType: `audio/${extension}`, extension };
		else if (/\.(jpg|jpeg|png|gif|webp)$/.test(pathname)) return { mimeType: `image/${extension}`, extension };

		return { mimeType: 'application/octet-stream', extension: 'bin' };
	}
}
