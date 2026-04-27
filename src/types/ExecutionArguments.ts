import { ExecutionType, ServiceType, UrlType } from '../enums';
import { JobOptions } from './JobOptions';

// Internal type used for execution
export interface ExecutionArguments extends JobOptions {
	service: ServiceType;
	method: string;
	entryUrl: string;
	targets: string[];
	executionType: ExecutionType;
	urlType: UrlType;
}
