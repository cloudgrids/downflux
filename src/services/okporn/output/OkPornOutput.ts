import { OkPornAlbumOutput } from './OkPornAlbumOutput';
import { OkPornVideoOutput } from './OkPornVideoOutput';

export interface OkPornOutput extends OkPornAlbumOutput, OkPornVideoOutput {
	starredBy: string[];
}
