import { AllowedExtension, MediaType, ProviderType } from '@types';
import { DownloadResult } from './DownloadContracts';

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

export interface PipelineExtractedItem {
	mediaType: MediaType;
	url: string;
	mimeType?: string;
	extension?: AllowedExtension;
	id?: string;
	username?: string;
	secondaryId?: string;
}

export interface IdentifierContext<TMetadata> {
	mediaType: MediaType;
	metadata: TMetadata;
	url: string;
	id?: string;
	secondaryId?: string;
	username?: string;
}
