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
	| 'completed';

export interface JobProgressEvent {
	status: JobProgressStatus;
	totalTargets?: number;
	totalItems?: number;
	extracted?: number;
	downloaded?: number;
	failed?: number;
	item?: PipelineItem;
	result?: Omit<DownloadResult, 'buffer'>;
	error?: Error;
}
