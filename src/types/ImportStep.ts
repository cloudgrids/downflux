import { StepType } from '../enums/StepType';

export interface ImportStep<T = unknown> {
	type: StepType;
	url: string;
	status: 'started' | 'done' | 'failed';
	data?: T;
	error?: Error;
}
