import { MediaType } from '../common/MediaType';
import { ServiceType } from '../enums';
import { DownloadResult } from './DownloadResult';

export type PipelineResourceType = 'image' | 'video' | 'audio';

export interface PipelineIdentifier {
	key: string;
	mediaType: MediaType;
}

export interface PipelineItem {
	downloadUrl: string;
	identifier: PipelineIdentifier;
	resourceType: PipelineResourceType;
	service: ServiceType;
}

export interface PipelineHook {
	onExtract?(item: PipelineItem): Promise<void> | void;
	onDownload?(item: DownloadResult): Promise<void> | void;
}
