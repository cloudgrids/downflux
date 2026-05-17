import { TagFilterOptions } from '@base';
import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';
import { TagsOutput } from '@provider/okporn';
import { VideoQuality } from '@types';

export type PerfectGirlsIdType = 'path' | 'url';

export interface PerfectGirlsExecArgs extends ExecutionArgs {
	modelArgs?: PerfectGirlsIdType;
	channelArgs?: PerfectGirlsIdType;
	tagArgs?: TagFilterOptions;
	videoArgs?: {
		quality?: VideoQuality;
	};
}

/**
 * @interface
 * Interface representing the output structure for PerfectGirls album operations.
 * Contains album metadata, images, and model context.
 */
export interface PerfectGirlsAlbumOutput {
	/** Model name associated with the album */
	modelName: string;

	/** Starred models associated with the album */
	starredModels: string[];

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

/**
 * Output structure for PerfectGirls video operations.
 * Contains video metadata, sources, poster, and album context.
 */
export interface PerfectGirlsVideoOutput extends DefaultVideoOutput {
	/** Video identifier */
	videoId: string;

	/** Screenshot image URL */
	videoScreenshot: string;

	/** Video creation date text */
	videoCreatedAt?: string;

	/** Author name associated with the video */
	author: string;

	/** Full source URL when available */
	fullVideoSource?: string;

	/** Album identifier linked to the video */
	videoAlbumId?: string;

	/** Album metadata linked to the video */
	videoAlbum?: PerfectGirlsAlbumOutput;

	/** Starred by list */
	starredBy: string[];
}

/**
 * Output structure for PerfectGirls tag operations.
 * Contains tags grouped by key.
 */
export interface PerfectGirlsTagOutput {
	/** Tags grouped by tag key */
	tags: TagsOutput;
}

export interface PerfectGirlsChannelOutput {
	channelUrls: string[];
	channelCount: number;
}

/**
 * Video card from an PerfectGirls model page.
 * Contains preview metadata for a model video.
 */
export interface PerfectGirlsModelVideoCard {
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
 * Output structure for PerfectGirls model video card operations.
 * Contains model context and video cards.
 */
export interface PerfectGirlsModelVideoIdsOutput {
	/** Model video page title */
	pageTitle: string;

	/** Number of video cards found */
	videoCount: number;

	/** Model name associated with the videos */
	modelName: string;

	/** Video cards found on the page */
	videoCards: PerfectGirlsModelVideoCard[];
}
/**
 * Output structure for PerfectGirls model operations.
 * Contains model page metadata and model links.
 */
export interface PerfectGirlsModelOutput {
	/** Model listing page title */
	pageTitle: string;

	/** Model listing page URL */
	pageUrl: string;

	/** Model URLs or path values */
	modelUrls: string[];

	/** Number of models found */
	modelCount: number;
}

/**
 * Combined PerfectGirls output structure.
 * Used for broad internal service typing.
 */
export interface PerfectGirlsOutput
	extends
		DefaultExecutionResult,
		PerfectGirlsAlbumOutput,
		PerfectGirlsVideoOutput,
		PerfectGirlsModelOutput,
		PerfectGirlsModelVideoIdsOutput {}
