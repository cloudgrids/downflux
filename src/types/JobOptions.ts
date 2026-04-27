import { ExecutionType, OutputType } from '../enums';

export interface DeviceOutputOptions {
	path: string;
	prefix?: string;
}

export interface JobOptions {
	dirConfig?: DeviceOutputOptions;
	allowedExtensions?: string[];
	maxDownloads?: number;
	signal?: AbortSignal;
	executionType?: ExecutionType;
	outputType?: OutputType;
}
