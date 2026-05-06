import { ExecutionType, ServiceType, UrlType } from '../../enums';
import { JobOptions } from './JobOptions';
import { JobProgressStatus } from './Progress';

export interface ExtractProgressEvent {
	status: Extract<JobProgressStatus, 'EXTRACTING' | 'EXTRACTED'>;
	target: string;
	countTarget?: boolean;
}

// Internal type used for execution
export interface ExecutionArgs extends JobOptions {
	service: ServiceType;
	method: string;
	entryUrl: string;
	targets: string[];
	returnType: 'array' | 'object';
	executionType: ExecutionType;
	urlType: UrlType;
}
