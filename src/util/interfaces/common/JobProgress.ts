import { DownloadResult } from './DownloadResult';
import { PipelineItem } from './PipelineItem';

export type JobProgressStatus =
	| 'STARTED'
	| 'EXTRACTING'
	| 'EXTRACTED'
	| 'QUEUED'
	| 'DOWNLOADING'
	| 'DOWNLOADED'
	| 'COMPLETED'
	| 'FAILED'
	| 'ABORTED'
	| 'COMPLETED'
	| 'HLS-SEGMENTING'
	| 'EXTRACTION-HOOK'
	| 'DOWNLOAD-HOOK'
	| 'RE_MUX'
	| 'PIPELINE';

export interface JobProgressEvent {
	// Status of the event
	status: JobProgressStatus;

	// Refers to the url target created in service
	target?: string;

	// The number of targets created in service
	totalTargets?: number;

	downloadInput?: Record<string, any>;

	// Total pipeline items to be downloaded
	totalItems?: number;

	// Currently extracted pipeline items
	extracted?: number;

	// Total downloaded url
	downloaded?: number;

	// Currently processed segments of a url if HLS type
	segment?: number;

	// Total number of HLS segments of a HLS url
	totalSegments?: number;

	// Total failed urls
	failed?: number;

	// Error thrown in service
	error?: Error;

	item?: PipelineItem;
	result?: Omit<DownloadResult, 'buffer'>;

	progress?: number; // %
	downloadedBytes?: number;
	totalBytes?: number;

	//Custom message
	message?: string;
}
