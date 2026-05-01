/**
 * Output structure for OkPorn album operations.
 * Contains album metadata, images, and model context.
 */
export interface OkPornAlbumOutput {
	/** Model name associated with the album */
	modelName: string;

	/** Album identifier */
	albumId: string;

	/** Album title */
	albumTitle: string;

	/** Album description */
	albumDescription: string;

	/** Album keywords */
	albumKeywords: string[];

	/** Album page URL */
	albumUrl: string;

	/** Album thumbnail URL */
	albumThumbnail: string;

	/** Album image URLs */
	albumImages: string[];

	/** Album image count */
	albumImageCount: number;
}
