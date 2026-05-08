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
