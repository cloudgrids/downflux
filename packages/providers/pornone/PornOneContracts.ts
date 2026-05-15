import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface PornOneOutput extends PornOneVideoOutput {
	quality?: string;
}

export interface PornOneExecArgs extends ExecutionArgs {}

export interface PornOneVideoOutput extends DefaultVideoOutput {
	categories?: string[];
	uploader: string;
	pornStars?: string[];
}
