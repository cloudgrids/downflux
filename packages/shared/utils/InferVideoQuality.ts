import { VideoQuality } from '@types';

export const inferVideoQuality = (url: string, defaultQuality?: VideoQuality): VideoQuality => {
	const match = url.match(/_(\d{3,4})p\.mp4/i);

	if (match) {
		const quality = match[1];

		switch (quality) {
			case '144':
				return VideoQuality.Q144;
			case '240':
				return VideoQuality.Q240;
			case '360':
				return VideoQuality.Q360;
			case '480':
				return VideoQuality.Q480;
			case '720':
				return VideoQuality.Q720;
			case '1080':
				return VideoQuality.Q1080;
			case '1440':
				return VideoQuality.Q1440;
			case '2160':
				return VideoQuality.Q2160;
			case '4320':
				return VideoQuality.Q4320;
		}
	}

	// fallback ONLY if no explicit quality found
	return defaultQuality || VideoQuality.QUnknown;
};
