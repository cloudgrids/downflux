import { DownloadResult } from '@app/contracts';
import { MediaType, ProviderType } from '@app/shared';
import { AllowedExtension } from '@app/types';

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
	provider: ProviderType;
}

export interface PipelineHook {
	onExtract?(item: PipelineItem): Promise<void> | void;
	onDownload?(payload: { item: PipelineItem; result: DownloadResult }): Promise<void> | void;
}
