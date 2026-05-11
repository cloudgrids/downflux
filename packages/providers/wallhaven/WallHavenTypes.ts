/**
 * @enum
 * WallHaven service methods */
export enum WallHavenMethods {
	/** Wallpaper page extraction */
	getWallPapers = 'getWallPapers',

	/** Single wallpaper extraction */
	getWallPaper = 'getWallPaper',

	/** User upload extraction */
	getUserUploads = 'getUserUploads',

	/** User uploads info extraction */
	getUserUploadsInfo = 'getUserUploadsInfo',

	/** User favorites extraction */
	getUserFavorites = 'getUserFavorites',

	/** User favorite collections extraction */
	getUserFavoriteCollections = 'getUserFavoriteCollections',

	/** User favorite collections extraction */
	getUserFavoriteCollection = 'getUserFavoriteCollection'
}

/**
 * @enum
 *  WallHaven thumbnail quality levels */
export enum WallHavenThumbnailQuality {
	/** High quality thumbnail */
	HIGH = 'high',

	/** Low quality thumbnail */
	LOW = 'low',

	/** Medium quality thumbnail */
	MEDIUM = 'medium'
}
