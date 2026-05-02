import { OutputType, ServiceType, VideoQuality } from '../../enums';
import { HttpFetchOptions, JobOptions } from '../common';

export interface DownloadOptions extends HttpFetchOptions, JobOptions {
	outputType?: OutputType;
	service: ServiceType;
	/** Allowed video qualities */
	avq?: VideoQuality;
}
