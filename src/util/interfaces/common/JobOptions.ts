import { ExecutionType, OutputType, VideoQuality } from '../../enums';
import { AllowedExtension } from '../../types';
import { DirectoryOutputOptions } from './DirectoryOutputOptions';
import { HttpFetchOptions } from './HttpFetchOptions';
import { PipelineHook } from './PipelineItem';
import { JobProgressEvent } from './Progress';
import { TagFilterOptions } from './TagFilterOptions';
import { TranscodeOptions } from './TranscodeOptions';

/**
 * Configuration options for a DownFlux job.
 * Combines fetch, extraction, pipeline, and output settings.
 */
export interface JobOptions extends HttpFetchOptions {
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
