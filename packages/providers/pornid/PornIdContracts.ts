import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface PornIdExecArgs extends ExecutionArgs {}
export interface PornIdOutput extends PornIdVideoOutput {}

export interface PornIdVideoOutput extends DefaultVideoOutput {
	id: string;
	categories: string[];
	previews: string[];
	timelineScreenCount?: number;
	timelineScreens?: string[];
	uploader: string;
}
