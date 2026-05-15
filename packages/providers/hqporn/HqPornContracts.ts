import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface HqPornOutput extends HqPornVideoOutput {}

export interface HqPornExecArgs extends ExecutionArgs {}

export interface HqPornVideoOutput extends DefaultVideoOutput {
	uploader: string;
}
