import { OutputType, ProviderType } from '@app/shared';
import { JobOptions } from '../execution';
import { PipelineItem } from '../pipeline';

export interface DownloadOptions extends JobOptions {
	outputType: OutputType;
	provider: ProviderType;
	reExtract?: (item: PipelineItem) => Promise<PipelineItem | null>;
	pipelineItem?: PipelineItem;
}
