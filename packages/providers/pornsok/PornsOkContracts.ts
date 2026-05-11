import { ExecutionArgs } from '@contracts';

export interface PornsOkExecArgs extends ExecutionArgs {}

export interface PornsOkVideoOutput {
	title: string;

	poster: string;

	// In seconds
	duration: number;

	pageUrl: string;

	uploadedAt: string;

	totalViews: number;

	type: string;

	videoUrl: string;

	starredBy?: string[];

	categories?: string[];
}

export interface PornsOkOutput extends PornsOkVideoOutput {}
