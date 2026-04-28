import { AllowedExtension } from '../common';
import { MediaType } from '../common/MediaType';
import { ServiceType } from '../enums';
import { DownloadResult } from './DownloadResult';

export interface PipelineIdentifier {
	key: string;
	mediaType: MediaType;
	mimeType: string;
	extension: AllowedExtension;
}

export interface PipelineItem {
	downloadUrl: string;
	identifier: PipelineIdentifier;
	service: ServiceType;
}

export interface PipelineHook {
	onExtract?(item: PipelineItem): Promise<void> | void;
	onDownload?(payload: { item: PipelineItem; result: DownloadResult }): Promise<void> | void;
}
