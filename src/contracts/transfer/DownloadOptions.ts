import { OutputType, ProviderType } from '@app/shared';
import { ExecutionOptions } from '../execution';
import { PipelineItem } from '../pipeline';

export interface DownloadOptions extends ExecutionOptions {
	outputType: OutputType;
	provider: ProviderType;
	reExtract?: (item: PipelineItem) => Promise<PipelineItem | null>;
	pipelineItem?: PipelineItem;
}
