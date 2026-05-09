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
