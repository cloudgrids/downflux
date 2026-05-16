import { TagFilterOptions } from '@base';
import { DefaultVideoOutput, ExecutionArgs } from '@contracts';
import { VideoQuality } from '@types';

export type OkPornIdType = 'path' | 'url';

export interface OkPornExecArgs extends ExecutionArgs {
	modelArgs?: OkPornIdType;
	channelArgs?: OkPornIdType;
	tagArgs?: TagFilterOptions;
	videoArgs?: {
		quality?: VideoQuality;
	};
}

/**
 * @interface
 * Interface representing the output structure for OkPorn album operations.
 * Contains album metadata, images, and model context.
 */
export interface OkPornAlbumOutput {
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
 * Output structure for OkPorn video operations.
 * Contains video metadata, sources, poster, and album context.
 */
export interface OkPornVideoOutput extends DefaultVideoOutput {
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
	videoAlbum?: OkPornAlbumOutput;

	/** Starred by list */
	starredBy: string[];
}

/**
 * Output structure for OkPorn tag operations.
 * Contains tags grouped by key.
 */
export interface OkPornTagOutput {
	/** Tags grouped by tag key */
	tags: TagsOutput;
}

export interface OkPornChannelOutput {
	channelUrls: string[];
	channelCount: number;
}

/** Mapping of tag keys to tag values */
export type TagsOutput = Record<string, string[]>;

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

/**
 * Combined OkPorn output structure.
 * Used for broad internal service typing.
 */
export interface OkPornOutput extends OkPornAlbumOutput, OkPornVideoOutput, OkPornModelOutput, OkPornModelVideoIdsOutput {}
