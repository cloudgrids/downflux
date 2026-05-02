import { WallHavenUserFavoriteCollectionOutput } from './WallHavenUserFavoriteCollectionOutput';
import { WallHavenUserFavoriteCollectionsOutput } from './WallHavenUserFavoriteCollectionsOutput';
import { WallHavenUserInfoOutput } from './WallHavenUserInfoOutput';
import { WallHavenUserUploadsOutput } from './WallHavenUserUploadsOutput';
import { WallHavenWallPaperOutput } from './WallHavenWallPaperOutput';

/**
 * @interface
 * Combined output structure for WallHaven operations.
 * Used for broad internal service typing.
 *
 * @internal
 */
export interface WallHavenOutput
	extends
		WallHavenWallPaperOutput,
		WallHavenUserUploadsOutput,
		WallHavenWallPaperOutput,
		WallHavenUserFavoriteCollectionOutput,
		WallHavenUserInfoOutput {
	collections: WallHavenUserFavoriteCollectionsOutput[];
}
