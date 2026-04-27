import { ExecutionType, OutputType } from '../enums';
import type { PipelineHook } from './PipelineItem';

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}

export interface JobOptions {
	dirConfig?: DeviceOutputOptions;
	allowedExtensions?: string[];
	maxDownloads?: number;
	pipelineHooks?: PipelineHook<any, any>[];
	signal?: AbortSignal;
	executionType?: ExecutionType;
	outputType?: OutputType;
}
