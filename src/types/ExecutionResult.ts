import { DownloadResult } from './DownloadResult';
import { ExecutionArguments } from './ExecutionArguments';
import { ExtractorResult } from './ExtractorResult';

export interface ExecutionResult<TExtractedMetadata = unknown, TDownloadMetadata = unknown> extends ExecutionArguments {
	extracted: ExtractorResult<TExtractedMetadata>[];
	targetUrls: string[];
	downloads: DownloadResult<TDownloadMetadata>[];
	downloaded: number;
	failed: number;
	errors: Error[];
	jsonPath?: string;
}
