import { OutputType } from '../enums';
import { DownloadResult } from './DownloadResult';
import { ExtractorResult } from './ExtractorResult';

export interface ImportExecutionResult {
	outputType: OutputType;

	metadataList: ExtractorResult[];

	urls: string[];

	downloads: DownloadResult[];
	downloaded: number;
	failed: number;
	errors: Error[];

	jsonPath?: string;
}
