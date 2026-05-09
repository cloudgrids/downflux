import { ExtractionTarget } from '@app/shared';

/**
 * Default output structure for extractor operations.
 * Represents normalized metadata and extracted resources.
 */
export interface DefaultExtractorResult<TCustomFields = unknown> {
	/** Page title */
	title: string;

	/** Page description */
	description: string;

	/** SEO keywords */
	keywords: string[];

	/** HTTP status code */
	status: number;

	/** Final resolved URL */
	sourceUrl: string;

	/** Anchor links */
	anchors: string[];

	/** Image URLs */
	images: string[];

	/** Media source URLs */
	sources: string[];

	/** Video URLs */
	videos: string[];

	/** Hyper links */
	links: string[];

	/** Video poster URLs */
	videoPosters?: string[];

	/** URLs extracted from div href attributes */
	divHREFs?: string[];

	/** All discovered URLs */
	allUrls?: string[];

	/** URL category for pipeline routing */
	extractionTarget?: ExtractionTarget;

	/** Extensible service-specific fields */
	customFields?: TCustomFields;
}
