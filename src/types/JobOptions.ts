import { AllowedExtension } from '../common';
import { ExecutionType, OutputType, VideoQuality } from '../enums';
import { HttpFetchOptions } from './HttpFetchOptions';
import { JobProgressEvent } from './JobProgress';
import type { PipelineHook } from './PipelineItem';

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}

export interface JobOptions extends HttpFetchOptions {
	/** Configuration for the output directory */
	dirConfig?: DeviceOutputOptions;

	/** List of allowed file extensions to download */
	allowedExtensions?: AllowedExtension[];

	/** Allowed video qualities */
	videoQualities?: VideoQuality[];

	/** Maximum number of concurrent downloads */
	maxDownloads?: number;

	/** Concurrency level for download phase */
	concurrency?: number;

	/** Concurrency level for extraction phase */
	extractConcurrency?: number;

	/** Number of times to retry a failed download before giving up */
	downloadRetries?: number;

	/** Delay in milliseconds between retry attempts */
	retryDelayMs?: number;

	/** List of hooks to be executed during the pipeline execution */
	pipelineHooks?: PipelineHook[];

	/** Progress event handler */
	onProgress?: (event: JobProgressEvent) => void;

	/** Whether to log progress to the console */
	logProgress?: boolean;

	/** Output format for the job results */
	outputType?: OutputType;

	/** Execution strategy for the job */
	executionType?: ExecutionType;

	/** Optional AbortSignal to cancel the job */
	signal?: AbortSignal;
}
