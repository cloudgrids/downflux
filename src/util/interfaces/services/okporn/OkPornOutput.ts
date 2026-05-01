import { OkPornAlbumOutput } from './OkPornAlbumOutput';
import { OkPornModelOutput } from './OkPornModelOutput';
import { OkPornModelVideoIdsOutput } from './OkPornModelVideoIdsOutput';
import { OkPornVideoOutput } from './OkPornVideoOutput';

/**
 * Combined OkPorn output structure.
 * Used for broad internal service typing.
 */
export interface OkPornOutput extends OkPornAlbumOutput, OkPornVideoOutput, OkPornModelOutput, OkPornModelVideoIdsOutput {
	/** Users listed in the starred section */
	starredBy: string[];
}
