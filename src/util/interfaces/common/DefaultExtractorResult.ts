import { UrlType } from '../../enums';

/** The default result structure for an extractor, containing common fields extracted from a webpage */
export interface DefaultExtractorResult {
	/** The title of the page eg: My Awesome Page */
	title: string;
	/** The description of the page eg: This is an awesome page about cool stuff */
	description: string;
	/** The keywords associated with the page eg: keyword1, keyword2 */
	keywords: string[];
	/** The HTTP status code of the page eg: 200 */
	status: number;
	/** The base URL denotes the input URL */
	baseUrl: string;
	/** The list of anchor tags in the page */
	anchors: string[];
	/** The list of images in the page */
	images: string[];
	/** The list of sources in the page */
	sources: string[];
	/** The list of video posters in the page */
	videoPosters?: string[];
	/** The list of hrefs in the page */
	divHrefs?: string[];
	/** The list of all URLs in the page */
	allUrls?: string[];
	/** The type of the URL to download */
	urlType?: UrlType;
	/** Custom fields for additional data */
	customFields?: Record<string, any>;
}
