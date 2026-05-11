import { ExecutionArgs } from '@contracts';

export interface Porn300ExecArgs extends ExecutionArgs {}

export interface Porn300Output extends Porn300VideoOutput {}

export interface Porn300VideoOutput {
	title: string;
	description: string;
	pageUrl: string;
	poster: string;
	videoUrl: string;
}
