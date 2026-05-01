import { WallHavenUserUploadsOutput } from './WallHavenUserUploadsOutput';
import { WallHavenWallPaperOutput } from './WallHavenWallPaperOutput';

/**
 * Combined output structure for WallHaven operations.
 * Used for broad internal service typing.
 *
 * @internal
 */
export interface WallHavenOutput extends WallHavenWallPaperOutput, WallHavenUserUploadsOutput {}
