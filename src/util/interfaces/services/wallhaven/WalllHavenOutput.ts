import { WallHavenUserFavoriteCollection } from './WallHavenUserFavoriteCollection';
import { WallHavenUserInfo } from './WallHavenUserInfo';
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
	extends WallHavenWallPaperOutput, WallHavenUserUploadsOutput, WallHavenUserFavoriteCollection, WallHavenUserInfo {
	collection: WallHavenUserFavoriteCollection[];
}
