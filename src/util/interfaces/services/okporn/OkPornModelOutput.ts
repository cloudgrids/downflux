export interface OkPornModelOutput {
	/** The title of the page eg: Models */
	pageTitle: string;
	/** The URL of the page eg: https://okporn.com/models */
	pageUrl: string;
	/** The URLs of the models in the page */
	modelUrls: string[];
	/** The number of models in the page */
	modelCount: number;
	/** The base URL denotes the input URL */
	baseUrl: string;
}
