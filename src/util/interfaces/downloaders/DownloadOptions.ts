import { OutputType, ServiceType } from '../../enums';
import { JobOptions, PipelineItem } from '../common';

export interface DownloadOptions extends JobOptions {
	outputType: OutputType;
	service: ServiceType;
	reExtract?: (item: PipelineItem) => Promise<PipelineItem | null>;
	pipelineItem?: PipelineItem;
}
