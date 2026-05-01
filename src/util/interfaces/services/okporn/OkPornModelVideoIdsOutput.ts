/**
 * Video card from an OkPorn model page.
 * Contains preview metadata for a model video.
 */
export interface OkPornModelVideoCard {
	/** Video identifier */
	videoId: string;

	/** Video card title */
	customTitle: string;

	/** Preview video URL */
	preview: string;

	/** Screenshot image URL */
	screenShot: string;

	/** Video duration text */
	duration: string;
}

/**
 * Output structure for OkPorn model video card operations.
 * Contains model context and video cards.
 */
export interface OkPornModelVideoIdsOutput {
	/** Model video page title */
	pageTitle: string;

	/** Number of video cards found */
	videoCount: number;

	/** Model name associated with the videos */
	modelName: string;

	/** Video cards found on the page */
	videoCards: OkPornModelVideoCard[];
}
