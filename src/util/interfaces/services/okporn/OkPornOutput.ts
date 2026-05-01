import { OkPornAlbumOutput } from './OkPornAlbumOutput';
import { OkPornModelOutput } from './OkPornModelOutput';
import { OkPornModelVideoIdsOutput } from './OkPornModelVideoIdsOutput';
import { OkPornVideoOutput } from './OkPornVideoOutput';

export interface OkPornOutput extends OkPornAlbumOutput, OkPornVideoOutput, OkPornModelOutput, OkPornModelVideoIdsOutput {
	/** The list of users who have starred the album */
	starredBy: string[];
}
