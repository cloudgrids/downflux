import { OkPornAlbumOutput } from './okporn-album.output';
import { OkPornVideoOutput } from './okporn-video.output';

export interface OkPornOutput extends OkPornAlbumOutput, OkPornVideoOutput {
	starredBy: string[];
}
