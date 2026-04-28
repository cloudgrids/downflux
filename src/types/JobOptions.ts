import { ExecutionType, OutputType } from '../enums';
import { HttpFetchOptions } from './HttpFetchOptions';
import type { PipelineHook } from './PipelineItem';

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}

export interface JobOptions extends HttpFetchOptions {
	dirConfig?: DeviceOutputOptions;
	allowedExtensions?: string[];
	maxDownloads?: number;
	pipelineHooks?: PipelineHook[];
	signal?: AbortSignal;
	executionType?: ExecutionType;
	outputType?: OutputType;
}
