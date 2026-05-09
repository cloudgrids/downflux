import { DirectoryOutputOptions, HttpFetchOptions, PipelineHook, TagFilterOptions, TranscodeOptions } from '@app/contracts';
import { ExecutionType, OutputType, VideoQuality } from '@app/shared';
import { AllowedExtension } from '@app/types';
import { JobProgressEvent } from './Progress';

/**
 * Configuration options for a DownFlux ExecutionCoordinator.
 * Combines fetch, extraction, pipeline, and output settings.
 */
export interface ExecutionOptions extends HttpFetchOptions {
	/** Directory output configuration */
	dirConfig?: DirectoryOutputOptions;

	/** Allowed file extensions */
	allowedExtensions?: AllowedExtension[];

	/** Allowed video quality */
	allowedVideoQuality?: VideoQuality;

	/** Tag filtering options */
	tagFilterOptions?: TagFilterOptions;

	/** Maximum number of items to download */
	maxDownloads?: number;

	/** Transform output to service-specific result type */
	transformOutput?: boolean;

	/** Download phase concurrency */
	concurrency?: number;

	/** Iterate only-- this prop is only used for logging http-services */
	noDownload?: boolean;

	/** Extraction phase concurrency */
	extractConcurrency?: number;

	/** Transcoding options */
	transcodeOptions?: TranscodeOptions;

	/** Download retry count */
	downloadRetries?: number;

	/** Delay between download retries in milliseconds */
	retryDelayMs?: number;

	/** PipelineRegistry lifecycle hooks */
	pipelineHooks?: PipelineHook[];

	/** Progress event handler */
	onProgress?: (event: JobProgressEvent) => void;

	/** Enables console progress logging */
	logProgress?: boolean;

	/** Output format for ExecutionCoordinator results */
	outputType?: OutputType;

	/** Job execution strategy */
	executionType?: ExecutionType;

	/** Abort signal for cancelling the ExecutionCoordinator */
	signal?: AbortSignal;
}
