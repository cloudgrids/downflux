export type PornHubChannelsQueryArgsType = 'all' | 'most_popular' | 'trending' | 'most_recent' | 'alphabetical';

export enum PornHubMethods {
	/** Video page extraction */
	getVideo = 'getVideo',

	/** Model page extraction */
	getModel = 'getModel',

	/** Channel page extraction */
	getChannels = 'getChannels',

	/** Tag page extraction */
	getTags = 'getTags',

	/** Model videos extraction */
	getVideos = 'getVideos'
}

export type PornHubVideosFormat = 'model' | 'channels' | 'pornstar';
