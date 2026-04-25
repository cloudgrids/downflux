import { ExecutionType, OutputType } from '../enums';
import { FetchOptions } from './FetchOptions';

export interface ImportExecutionOptions extends FetchOptions {
	outputType?: OutputType;
	executionType?: ExecutionType;
	device?: DeviceOutputOptions;
	json?: JsonOutputOptions;
	allowedExtensions?: string[];
	maxDownloads?: number;
	signal?: AbortSignal;
}

export interface JsonOutputOptions {
	path: string;
	prefix?: string;
}

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}
