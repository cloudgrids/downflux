import { DownloadResult } from './DownloadResult';
import { ExecutionArguments } from './ExecutionArguments';
import { ExtractorResult } from './ExtractorResult';

export interface ExecutionResult<T = unknown> extends ExecutionArguments {
	extracted: ExtractorResult<T>[];
	targetUrls: string[];
	downloads: DownloadResult[];
	downloaded: number;
	failed: number;
	errors: Error[];
	jsonPath?: string;
}
