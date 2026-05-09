/** URL category for extraction and pipeline routing */
export enum ExtractionTarget {
	/** Anchor href URLs */
	ANCHORS = 'ANCHORS',

	/** Image URLs */
	IMAGES = 'IMAGES',

	/** Div href URLs */
	DIV_HREFS = 'DIV_HREFS',

	/** Media source URLs */
	SOURCES = 'SOURCES',

	/** Video poster URLs */
	VIDEO_POSTER = 'VIDEO_POSTER',

	/** All discovered URLs */
	ALL_URLS = 'ALL_URLS'
}
