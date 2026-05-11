import { ExecutionArgs } from '@contracts';
import { UrlFormat, VideoQuality } from '@types';
import { PornHubVideosFormat } from './PornHubTypes';

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

/**
 * @interface
 * Interface representing the output structure for OkPorn channel operations.
 * Contains channel links and count metadata.
 */
export interface PornHubChannelsOutput {
	channelName: string;
	subscribers: number;
	videos: number;
	videosViews: number;
	channelThumbnail: string;
	channelUrl: string;
	rank: number;
	isAwarded: boolean;
}

export interface PornHubMediaDefinition {
	defaultQuality?: boolean;
	format?: string;
	height?: number;
	quality?: string;
	videoUrl?: string;
}

/**
 * @interface
 * @internal type used for internal transformations,
 */
export interface PornHubOutput extends PornHubVideoOutput, PornHubVideosOutput, PornHubChannelsOutput {
	channels: PornHubChannelsOutput[];
}

/**
 * @interface
 * Interface representing the output structure for a PornHub video.
 */
export interface PornHubVideoOutput {
	/** The title of the video */
	title: string;

	/** The URL of the video */
	videoUrl: string;

	/** The URL of the video thumbnail */
	thumbnailUrl: string;

	/** Associated .m3u8 files and metadata */
	videoMetadata: PornHubVideo;

	/** The duration of the video in seconds */
	duration: string;

	/** The number of views the video has */
	views: string;

	/** The number of likes the video has */
	likes: string;

	/** The tags associated with the video */
	tags?: string[];

	/** The category of the video */
	category?: string[];

	/** The name of the uploader of the video */
	user: string;

	/** user avatar */
	userAvatar: string;

	/** total Videos */
	totalVideos: string;

	/** total subscribers */
	totalSubscribers: string;

	/** The upload date of the video */
	uploadDate: string;
}

export interface PornHubVideo {
	group: number;
	height: number;
	width: number;
	defaultQuality: boolean;
	format: string;
	videoUrl: string;
	quality: string[] | string;
	remote: boolean;
	segmentFormats?: { audio: string; video: string };
}

/**
 * @interface
 * Interface representing the output structure for a PornHub model's videos.
 */
export interface PornHubVideosOutput {
	/** The username of the model */
	username?: string;

	/** Fetched videos */
	fetchedVideos: string;

	/** Current page of videos */
	currentPage: string;

	/** An array of video URLs associated with the model */
	videoUrls: string[];
}
