import { ExecutionType, OutputType, VideoQuality } from '../../enums';
import { AllowedExtension } from '../../types';
import { DirectoryOutputOptions } from './DirectoryOutputOptions';
import { HttpFetchOptions } from './HttpFetchOptions';
import { JobProgressEvent } from './JobProgress';
import { PipelineHook } from './PipelineItem';
import { TagFilterOptions } from './TagFilterOptions';

/**
 * Configuration options for a DownFlux job.
 * Combines fetch, extraction, pipeline, and output settings.
 */
export interface JobOptions extends HttpFetchOptions {
	/** Directory output configuration */
	dirConfig?: DirectoryOutputOptions;

	/** Allowed file extensions */
	allowedExtensions?: AllowedExtension[];

	/** Allowed video qualities */
	videoQualities?: VideoQuality[];

	/** Tag filtering options */
	tagFilterOptions?: TagFilterOptions;

	/** Maximum number of items to download */
	maxDownloads?: number;

	/** Transform output to service-specific result type */
	transformOutput?: boolean;

	/** Download phase concurrency */
	concurrency?: number;

	/** Extraction phase concurrency */
	extractConcurrency?: number;

	/** Download retry count */
	downloadRetries?: number;

	/** Delay between download retries in milliseconds */
	retryDelayMs?: number;

	/** Pipeline lifecycle hooks */
	pipelineHooks?: PipelineHook[];

	/** Progress event handler */
	onProgress?: (event: JobProgressEvent) => void;

	/** Enables console progress logging */
	logProgress?: boolean;

	/** Output format for job results */
	outputType?: OutputType;

	/** Job execution strategy */
	executionType?: ExecutionType;

	/** Abort signal for cancelling the job */
	signal?: AbortSignal;
}
