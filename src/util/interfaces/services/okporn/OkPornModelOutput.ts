/**
 * Output structure for OkPorn model operations.
 * Contains model page metadata and model links.
 */
export interface OkPornModelOutput {
	/** Model listing page title */
	pageTitle: string;

	/** Model listing page URL */
	pageUrl: string;

	/** Model URLs or path values */
	modelUrls: string[];

	/** Number of models found */
	modelCount: number;
}
