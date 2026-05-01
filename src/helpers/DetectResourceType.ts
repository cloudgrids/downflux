import { extname } from 'path';
import { AllowedExtension } from '../util';

export const detectResourceType = (url: string): { mimeType: string; extension: AllowedExtension } => {
	const pathname = extname(url);
	const extension = pathname.substring(1).toLowerCase() as AllowedExtension;

	if (/\.(mp4|m3u8|webm|mov|mkv)$/.test(pathname)) return { mimeType: `video/${extension}`, extension };
	else if (/\.(mp3|wav|aac|flac|ogg)$/.test(pathname)) return { mimeType: `audio/${extension}`, extension };
	else if (/\.(jpg|jpeg|png|gif|webp)$/.test(pathname)) return { mimeType: `image/${extension}`, extension };

	return { mimeType: 'application/octet-stream', extension: 'bin' };
};
