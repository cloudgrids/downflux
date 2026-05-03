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
	| 'stream-started'
	| 'stream-ended'
	| 'stream-failed'
	| 'segment-downloading'
	| 'hls-manifest-downloading'
	| 'hls-manifest-downloaded'
	| 'hls-manifest-failed'
	| 'hls-master-downloading'
	| 'hls-master-downloaded'
	| 'hls-master-failed'
	| 'hls-segments-downloading'
	| 'hls-segments-downloaded'
	| 'hls-segments-failed'
	| 'hls-key-downloading'
	| 'hls-key-not-found'
	| 'hls-key-downloaded'
	| 'hls-key-failed'
	| 'hls-stitching-started'
	| 'hls-stitching-completed'
	| 'hls-stitching-failed'
	| 'hls-segment-decrypting'
	| 'hls-segment-decrypted'
	| 'hls-segment-decrypt-failed';

export interface JobProgressEvent {
	status: JobProgressStatus;
	target?: string;
	downloadInput?: Record<string, any>;
	totalTargets?: number;
	totalItems?: number;
	extracted?: number;
	downloaded?: number;
	failed?: number;
	item?: PipelineItem;
	result?: Omit<DownloadResult, 'buffer'>;
	error?: Error;
}
