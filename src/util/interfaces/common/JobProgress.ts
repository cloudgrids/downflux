import { DownloadResult } from './DownloadResult';
import { PipelineItem } from './PipelineItem';

export type JobProgressStatus =
	| 'started'
	| 'extracting'
	| 'extracted'
	| 'queued'
	| 'downloading'
	| 'downloaded'
	| 'failed'
	| 'aborted'
	| 'completed'
	| 'segment-progress';

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
}
