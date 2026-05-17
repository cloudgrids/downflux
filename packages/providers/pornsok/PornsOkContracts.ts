import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface PornsOkExecArgs extends ExecutionArgs {}

export interface PornsOkVideoOutput extends DefaultVideoOutput {
	duration: number;
	uploadedAt: string;
	totalViews: number;
	type: string;
	starredBy?: string[];
	categories?: string[];
}

export interface PornsOkOutput extends DefaultExecutionResult, PornsOkVideoOutput {}
