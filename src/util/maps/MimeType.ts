import { AudioExtension, ImageExtension, VideoExtension } from '../types';

export const MIME_TYPE: Partial<Record<ImageExtension | VideoExtension | AudioExtension, string>> = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	gif: 'image/gif',
	webp: 'image/webp',
	mp4: 'video/mp4',
	ts: 'video/mp2t',
	m3u8: 'application/vnd.apple.mpegurl',
	webm: 'video/webm',
	mp3: 'audio/mpeg',
	wav: 'audio/wav'
} as const;
