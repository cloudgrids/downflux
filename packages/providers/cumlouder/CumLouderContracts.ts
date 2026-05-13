import { ExecutionArgs } from '@contracts';

export interface CumLouderExecArgs extends ExecutionArgs {}
export interface CumLouderOutput extends CumLouderVideoOutput {}

export interface CumLouderVideoOutput {
	title: string;
	description: string;
	videoUrl: string;
	poster: string;
	pageUrl: string;
}
