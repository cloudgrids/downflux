import { AllowedExtension, MediaType, Provider } from '@types';
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
	provider: Provider;
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

export interface PipelineExtractionHandler<T> {
	getUrl(item: T): string;
	getMedia(item: T): MediaType;
	getMime?(item: T): string;
	getExt?(item: T): AllowedExtension;
	getId?(item: T): string;
	getSecondaryId?(item: T): string;
	getUsername?(item: T): string;
}

export type PipelineMapping<TMetadata> = [TMetadata[] | undefined, PipelineExtractionHandler<TMetadata>];
export type PipelineMappings = PipelineMapping<unknown>[];

export interface IdentifierContext<TMetadata> {
	mediaType: MediaType;
	metadata: TMetadata;
	url: string;
	id?: string;
	secondaryId?: string;
	username?: string;
}
