import { ExecutionType, ServiceType, UrlType } from '../../enums';
import { JobOptions } from './JobOptions';
import { JobProgressStatus } from './JobProgress';

export interface ExtractProgressEvent {
	status: Extract<JobProgressStatus, 'extracting' | 'extracted'>;
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
	/** @internal Allows nested transformer extractions to update the active job progress state. */
	onExtractProgress?: (event: ExtractProgressEvent) => void;
	onDownloadProgress?: (event: ExtractProgressEvent) => void;
}
