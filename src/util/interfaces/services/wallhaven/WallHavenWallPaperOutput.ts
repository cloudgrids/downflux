import { WallHavenThumbnail } from './WallHavenThumbnail';

export interface WallHavenWallPaperOutput {
	/** The ID of the wall paper */
	id: string;
	/** The title of the wall paper */
	title: string;
	/** The description of the wall paper */
	description: string;
	/** The tags associated with the wall paper */
	tags: string[];
	/** The number of views for the wall paper */
	views: number;
	/** The number of favorites for the wall paper */
	favorites: number;
	/** The purity of the wall paper */
	purity: string;
	/** The category of the wall paper */
	category: string;
	/** The width of the wall paper */
	dimensionX: number;
	/** The height of the wall paper */
	dimensionY: number;
	/** The resolution of the wall paper */
	resolution: string;
	/** The aspect ratio of the wall paper */
	ratio: string;
	/** The size of the wall paper */
	size: number;
	/** The username of the uploader */
	uploader: string;
	/** The date and time when the wall paper was created */
	createdAt: string;
	/** The date and time when the wall paper was last updated */
	updatedAt: string;
	/** The URL of the wall paper on the site */
	baseUrl: string;
	/** The thumbnails of the wall paper */
	thumbnails: WallHavenThumbnail[];
}
