/** Output interface for fetching video IDs from a model page on OkPorn */
export interface OkPornModelVideoCard {
	/** The ID of the video eg: 12345 */
	videoId: string;
	/** The custom title of the video eg: My Awesome Video */
	customTitle: string;
	/** The URL of the video preview eg: https://okporn.com/video/12345/preview.mp4, usually in HLS format */
	preview: string;
	/** The URL of the video screenshot eg: https://okporn.com/video/12345/screenshot.jpg */
	screenShot: string;
	/** The duration of the video eg: 10:00 */
	duration: string;
}

export interface OkPornModelVideoIdsOutput {
	/** The title of the page eg: Videos */
	pageTitle: string;
	/** The number of videos in the page eg: 10 */
	videoCount: number;
	/** The name of the model associated with the videos, if any eg: John-Doe */
	modelName?: string;
	/** An array of video cards */
	videoCards: OkPornModelVideoCard[];
}
