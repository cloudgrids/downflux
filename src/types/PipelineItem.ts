import { ServiceType } from '../enums';
import { DownloadResult } from './DownloadResult';

export type PipelineResourceType = 'image' | 'video' | 'audio';

export interface PipelineItem {
	sourceUrl: string;
	downloadUrl: string;
	resourceType: PipelineResourceType;
	service: ServiceType;
}

export interface PipelineHook {
	onExtract?(item: PipelineItem): Promise<void> | void;
	onDownload?(item: DownloadResult): Promise<void> | void;
}
