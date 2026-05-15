import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface PornDoeExecArgs extends ExecutionArgs {}
export interface PornDoeOutput extends PornDoeVideoOutput {}

export interface PornDoeVideoOutput extends Omit<DefaultVideoOutput, 'videos'> {
	videos: PornDoeVideoSource[];
	preview: string;
	id: string;
	uploader: string;
	banners?: {
		page: string;
		id: string;
	};
}

export interface PornDoeVideoSource {
	path: string;
	auto: string;
	name: string;
	height: number;
	width: number;
	bitrate: number;
	default: boolean;
	link: string;
	type: string;
}
