import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface Lesbian8ExecArgs extends ExecutionArgs {}
export interface Lesbian8Output extends Lesbian8VideoOutput {}

export interface Lesbian8VideoOutput extends DefaultVideoOutput {
	id: string;
	starred: string[];
	timelineScreenCount: number;
	timelineScreens: string[];
	categories: string[];
}
