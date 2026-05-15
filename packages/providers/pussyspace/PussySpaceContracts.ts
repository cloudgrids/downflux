import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface PussySpaceExecArgs extends ExecutionArgs {}
export interface PussySpaceOutput extends PussySpaceVideoOutput {
	token: string;
}

export interface PussySpaceVideoOutput extends DefaultVideoOutput {}
