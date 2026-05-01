import { VideoQuality } from '../util';

export const detectVideoQuality = (url: string): VideoQuality => {
	if (url.includes('1080')) return VideoQuality.Q1080;
	if (url.includes('720')) return VideoQuality.Q720;
	if (url.includes('480')) return VideoQuality.Q480;
	if (url.includes('360')) return VideoQuality.Q360;
	if (url.includes('240')) return VideoQuality.Q240;
	return VideoQuality.QUnknown;
};
