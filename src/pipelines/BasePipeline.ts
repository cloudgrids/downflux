import { ServiceType } from '../enums';
import { PipelineItem } from '../types';

export class BasePipeline {
	public build(metadata: any, service: ServiceType): PipelineItem[] {
		const items: PipelineItem[] = [];
		const urls = this.extractUrls(metadata);

		for (const url of urls) {
			items.push({
				sourceUrl: metadata.baseUrl || '',
				downloadUrl: url,
				resourceType: this.detectResourceType(url),
				service
			});
		}

		return items;
	}

	protected extractUrls(metadata: any): string[] {
		const urls: string[] = [];

		if (metadata.images && Array.isArray(metadata.images)) {
			urls.push(...metadata.images.filter((img): img is string => typeof img === 'string' && Boolean(img)));
		}

		if (metadata.sources && Array.isArray(metadata.sources)) {
			urls.push(...metadata.sources.filter((src): src is string => typeof src === 'string' && Boolean(src)));
		}

		if (metadata.videoPosters && Array.isArray(metadata.videoPosters)) {
			urls.push(...metadata.videoPosters.filter((poster): poster is string => typeof poster === 'string' && Boolean(poster)));
		}

		if (metadata.divHrefs && Array.isArray(metadata.divHrefs)) {
			urls.push(...metadata.divHrefs.filter((href): href is string => typeof href === 'string' && Boolean(href)));
		}

		if (metadata.allUrls && Array.isArray(metadata.allUrls)) {
			urls.push(...metadata.allUrls.filter((url): url is string => typeof url === 'string' && Boolean(url)));
		}

		return urls;
	}

	protected detectResourceType(url: string): 'image' | 'video' | 'audio' {
		const pathname = url.split('?')[0].toLowerCase();

		if (/\.(mp4|m3u8|webm|mov|mkv)$/.test(pathname)) return 'video';
		if (/\.(mp3|wav|aac|flac|ogg)$/.test(pathname)) return 'audio';

		return 'image';
	}
}
