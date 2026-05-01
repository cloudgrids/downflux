import { WallHavenThumbnail } from './WallHavenThumbnail';

/**
 * Output structure for WallHaven wallpaper operations.
 * Contains wallpaper metadata, dimensions, uploader, and thumbnails.
 */
export interface WallHavenWallPaperOutput {
	/** Wallpaper identifier */
	id: string;

	/** Wallpaper title */
	title: string;

	/** Wallpaper description */
	description: string;

	/** Wallpaper tags */
	tags: string[];

	/** View count */
	views: number;

	/** Favorite count */
	favorites: number;

	/** Purity label */
	purity: string;

	/** Category label */
	category: string;

	/** Wallpaper width in pixels */
	dimensionX: number;

	/** Wallpaper height in pixels */
	dimensionY: number;

	/** Resolution text */
	resolution: string;

	/** Aspect ratio text */
	ratio: string;

	/** File size in bytes */
	size: number;

	/** Uploader username */
	uploader: string;

	/** Creation date text */
	createdAt: string;

	/** Update date text */
	updatedAt: string;

	/** Wallpaper thumbnails */
	thumbnails: WallHavenThumbnail[];
}
