import { ServiceType } from '../enums';
import { PipelineItem } from '../types';
import { BasePipeline } from './BasePipeline';

export class OkPornPipeline extends BasePipeline {
	public override build(metadata: any, service: ServiceType): PipelineItem[] {
		const items: PipelineItem[] = [];
		const urls = this.extract(metadata);

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

	private extract(metadata: any): string[] {
		const urls: string[] = [];

		if (metadata.albumImages && Array.isArray(metadata.albumImages)) {
			urls.push(...metadata.albumImages.filter((img): img is string => typeof img === 'string' && Boolean(img)));
		}

		if (metadata.videoSources && Array.isArray(metadata.videoSources)) {
			urls.push(...metadata.videoSources.filter((src): src is string => typeof src === 'string' && Boolean(src)));
		}

		if (metadata.modelThumbnail && typeof metadata.modelThumbnail === 'string' && urls.length === 0) {
			urls.push(metadata.modelThumbnail);
		}

		if (urls.length === 0 && metadata.sources && Array.isArray(metadata.sources)) {
			urls.push(...metadata.sources.filter((src): src is string => typeof src === 'string' && Boolean(src)));
		}

		return urls;
	}
}
