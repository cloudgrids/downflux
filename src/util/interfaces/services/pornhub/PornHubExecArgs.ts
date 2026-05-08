import { UrlFormat, VideoQuality } from '../../../enums';
import { ExecutionArgs } from '../../common';

/**
 * @interface
 * Interface representing the arguments for executing a PornHub-related operation.
 */
export interface PornHubExecArgs extends ExecutionArgs {
	/** Arguments for executing video output */
	videoArgs?: PornHubVideoExecArgs;

	/** Arguments for getting videos from channel or model or pornstar */
	videosArgs?: PornHubVideosExecArgs;
}

/**
 *@interface
 Interface representing the arguments for executing PornHubVideo execution
 */
export interface PornHubVideoExecArgs {
	/** The viewKey refers to the unique identifier for the video url */
	viewKey?: string;

	/** The quality of the video to be fetched */
	quality?: VideoQuality;
}

export type PornHubVideosFormat = 'model' | 'channels' | 'pornstar';
/**
 * @interface
 * Interface representing the output structure for getting videos
 */
export interface PornHubVideosExecArgs {
	/** username refers to the channel or model or pornstar name */
	username?: string;

	/** The type of the format for getting videos */
	type?: PornHubVideosFormat;

	/** The format is used for tweaking the urls either in url or in viewKey format
	 * @defaultValue url
	 */
	format?: UrlFormat;
}

export type PornHubChannelsQueryArgsType = 'all' | 'most_popular' | 'trending' | 'most_recent' | 'alphabetical';
