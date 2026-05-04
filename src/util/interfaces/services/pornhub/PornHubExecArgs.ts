import { UrlFormat, VideoQuality } from '../../../enums';
import { ExecutionArgs } from '../../common';

/**
 * @interface
 * Interface representing the arguments for executing a PornHub-related operation.
 */
export interface PornHubExecArgs extends ExecutionArgs {
	videoArgs?: PornHubVideoExecArgs;

	modelVideosArgs?: PornHubModelVideosExecArgs;
}

export interface PornHubVideoExecArgs {
	viewKey: string;

	quality?: VideoQuality;
}

export interface PornHubModelVideosExecArgs {
	username: string;

	format?: UrlFormat;
}
