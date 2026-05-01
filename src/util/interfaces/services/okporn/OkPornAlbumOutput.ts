export interface OkPornAlbumOutput {
	/** The name of the model associated with the album, if any eg: John-Doe */
	modelName?: string;
	/** The ID of the album eg: 12345 */
	albumId: string;
	/** The title of the album eg: My Awesome Album */
	albumTitle: string;
	/** The description of the album eg: A collection of my favorite photos */
	albumDescription: string;
	/** The keywords associated with the album eg: keyword1, keyword2 */
	albumKeywords: string[];
	/** The URL of the album eg: https://okporn.com/album/12345 */
	albumUrl: string;
	/** The URL of the album thumbnail eg: https://okporn.com/album/12345/thumbnail.jpg */
	albumThumbnail: string;
	/** The URLs of the images in the album eg: https://okporn.com/album/12345/image1.jpg */
	albumImages: string[];
	/** The number of images in the album eg: 10 */
	albumImageCount: number;
	/** The base URL denotes the input URL */
	baseUrl: string;
}
