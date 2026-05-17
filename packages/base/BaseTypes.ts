/** Default service methods */
export enum DefaultMethods {
	/** Link extraction */
	getLinks = 'getLinks',

	/** Image extraction */
	getImages = 'getImages',

	/** Video extraction */
	getVideos = 'getVideos',

	/** Audio extraction */
	getAudio = 'getAudios'
}

export type SniSpoofStatus = 'working' | 'failed' | 'untested';
