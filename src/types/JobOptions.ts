import { ExecutionType, OutputType } from '../enums';
import { HttpFetchOptions } from './HttpFetchOptions';
import { JobProgressEvent } from './JobProgress';
import type { PipelineHook } from './PipelineItem';

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}

export interface JobOptions extends HttpFetchOptions {
	dirConfig?: DeviceOutputOptions;
	allowedExtensions?: string[];
	maxDownloads?: number;
	concurrency?: number;
	extractConcurrency?: number;
	downloadRetries?: number;
	retryDelayMs?: number;
	pipelineHooks?: PipelineHook[];
	onProgress?: (event: JobProgressEvent) => void;
	logProgress?: boolean;
	signal?: AbortSignal;
	executionType?: ExecutionType;
	outputType?: OutputType;
}
