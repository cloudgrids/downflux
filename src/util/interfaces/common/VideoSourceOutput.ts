import { VideoQuality } from '../../enums';

export interface VideoSourceOutput {
	quality: VideoQuality;
	url: string;
}
