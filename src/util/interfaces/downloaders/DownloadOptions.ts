import { OutputType, ServiceType, VideoQuality } from '../../enums';
import { HttpFetchOptions, JobOptions, JobProgressEvent, PipelineItem } from '../common';

export interface DownloadOptions extends HttpFetchOptions, JobOptions {
	outputType?: OutputType;
	service: ServiceType;
	onSegmentProgress?: (event: JobProgressEvent) => void;
	reExtract?: (item: PipelineItem) => Promise<PipelineItem | null>;
	pipelineItem?: PipelineItem;
	reExtractCount?: number;
	cdnFallbackCount?: number;
	/** Allowed video quality */
	avq?: VideoQuality;
}
