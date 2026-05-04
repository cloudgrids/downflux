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
	| 'HLS-SEGMENTING';

export interface JobProgressEvent {
	status: JobProgressStatus;
	target?: string;
	downloadInput?: Record<string, any>;
	totalTargets?: number;
	totalItems?: number;
	extracted?: number;
	downloaded?: number;
	segment?: number;
	totalSegments?: number;
	failed?: number;
	item?: PipelineItem;
	result?: Omit<DownloadResult, 'buffer'>;
	error?: Error;
	downloadedBytes?: number;
	totalBytes?: number;
	percent?: number;
}
