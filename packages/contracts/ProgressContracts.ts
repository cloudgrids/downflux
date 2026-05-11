import { JobProgressStatus, ProgressDestination } from '@types';
import { DownloadResult } from './DownloadContracts';
import { PipelineItem } from './PipelineContracts';

export interface JobProgressEvent {
	status: JobProgressStatus;
	progress: ProgressDestination;

	// Service targets
	currentTarget: string;
	totalTargets: number;
	resolvedTargets: number;

	// PipelineRegistry targets or to be downloaded items
	currentItem: string;
	totalItems: number;
	resolvedItems: number;

	// Redirected URL
	redirectedUrl: string;

	// HLS segments
	hlsPlaylistUrl: string;
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

	// Failed items (PipelineRegistry items)
	failed: number;

	// Error thrown in service
	error: Error;

	// Any custom message
	message: string;

	// On getting 404 status we need to fetch the url based on service
	item: PipelineItem;

	result: Omit<DownloadResult, 'buffer'>;
}
