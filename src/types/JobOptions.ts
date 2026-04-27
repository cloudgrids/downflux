import { ExecutionType, OutputType } from '../enums';

export interface JobOptions {
	device?: DeviceOutputOptions;
	json?: JsonOutputOptions;
	allowedExtensions?: string[];
	maxDownloads?: number;
	signal?: AbortSignal;
	executionType?: ExecutionType;
	outputType?: OutputType;
}

export interface JsonOutputOptions {
	path: string;
	prefix?: string;
}

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}
