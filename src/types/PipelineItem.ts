import type { DownloadResult } from './DownloadResult';
import type { ExtractorResult } from './ExtractorResult';

export type PipelineResourceType = 'image' | 'video' | 'audio';

export interface PipelineIdentifiers {
	albumId?: string;
	videoId?: string;
	username?: string;
}

export interface PipelineItem<TExtractedMetadata = unknown, TDownloadMetadata = unknown> {
	sourceUrl: string;
	extracted?: ExtractorResult<TExtractedMetadata>;
	selectedUrl?: string;
	resourceType?: PipelineResourceType;
	identifiers?: PipelineIdentifiers;
	download?: DownloadResult<TDownloadMetadata>;
}

export interface PipelineHook<TExtractedMetadata = unknown, TDownloadMetadata = unknown> {
	onExtract?(item: PipelineItem<TExtractedMetadata, TDownloadMetadata>): Promise<void> | void;
	onDownload?(item: PipelineItem<TExtractedMetadata, TDownloadMetadata>): Promise<void> | void;
}
