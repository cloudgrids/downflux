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
