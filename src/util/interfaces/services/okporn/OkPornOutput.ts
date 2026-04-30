import { OkPornAlbumOutput } from './OkPornAlbumOutput';
import { OkPornModelOutput } from './OkPornModelOutput';
import { OkPornVideoOutput } from './OkPornVideoOutput';

export interface OkPornOutput extends OkPornAlbumOutput, OkPornVideoOutput, OkPornModelOutput {
	starredBy: string[];
	baseUrl: string;
}
