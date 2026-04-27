import { DownloadResult } from './DownloadResult';
import { ExecutionArguments } from './ExecutionArguments';
import { ExtractorResult } from './ExtractorResult';
import { PipelineItem } from './PipelineItem';

export interface ExecutionResult<TExtractedMetadata = unknown, TDownloadMetadata = unknown> extends ExecutionArguments {
	pipeline: PipelineItem<TExtractedMetadata, TDownloadMetadata>[];
	extracted: ExtractorResult<TExtractedMetadata>[];
	targetUrls: string[];
	downloads: DownloadResult<TDownloadMetadata>[];
	downloaded: number;
	failed: number;
	errors: Error[];
	jsonPath?: string;
}
