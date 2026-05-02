import { MediaType, ServiceType } from '../../enums';
import { AllowedExtension } from '../../types';
import { DownloadResult } from './DownloadResult';

export interface PipelineIdentifier {
	key: string;
	mediaType: MediaType;
	mimeType: string;
	extension: AllowedExtension;
}

export interface PipelineItem {
	downloadUrl: string;
	sourceUrl: string;
	identifier: PipelineIdentifier;
	service: ServiceType;
}

export interface PipelineHook {
	onExtract?(item: PipelineItem): Promise<void> | void;
	onDownload?(payload: { item: PipelineItem; result: DownloadResult }): Promise<void> | void;
}
