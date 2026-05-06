import { DownloadResult } from './DownloadResult';
import { PipelineItem } from './PipelineItem';

export type JobProgressStatus =
	| 'STARTED'
	| 'QUEUED'
	| 'DOWNLOADING'
	| 'DOWNLOADED'
	| 'COMPLETED'
	| 'FAILED'
	| 'ABORTED'
	| 'COMPLETED'
	| 'EXTRACTION-HOOK'
	| 'DOWNLOADING-HOOK';

export type ProgressDestination =
	| 'INITIALIZING'
	| 'FETCHING'
	| 'PARSING'
	| 'TRANSFORMING'
	| 'PIPELINING'
	| 'DOWNLOADING'
	| 'REQUESTING_STREAM'
	| 'HANDLING_404'
	| 'APPLYING_STRATEGY'
	| 'DETECTED_HLS'
	| 'APPLIED_HLS_QUALITY'
	| 'PARSED_DECRYPTION_HLS_KEY'
	| 'SEGMENTING-HLS'
	| 'RE_MUX_HLS'
	| 'STARTED_STREAMING';

export interface JobProgressEvent {
	status: JobProgressStatus;
	progress: ProgressDestination;

	// Service targets
	currentTarget: string;
	totalTargets: number;
	resolvedTargets: number;

	// Pipeline targets or to be downloaded items
	currentItem: string;
	totalItems: number;
	resolvedItems: number;

	// Redirected URL
	redirectedUrl: string;

	// HLS segments
	hlsSegmentUrl: string;
	currentSegment: string;
	totalSegments: number;
	resolvedSegments: number;

	// Per item progress
	downloadProgress: number; // %
	downloadedBytes: number;
	totalBytes: number;

	// emitter start time
	startTime: number;
	lastUpdateTime: number;

	// metrics
	prevBytes: number;
	speed: number;
	eta: number;

	// Failed items (Pipeline items)
	failed: number;

	// Error thrown in service
	error: Error;

	// Any custom message
	message: string;

	// On getting 404 status we need to fetch the url based on service
	item: PipelineItem;

	result: Omit<DownloadResult, 'buffer'>;
}
