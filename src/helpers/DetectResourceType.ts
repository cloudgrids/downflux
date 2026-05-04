import { FileService } from '../file';
import { AllowedExtension, ServiceType } from '../util';

export const detectResourceType = (url: string, service: ServiceType): { mimeType: string; extension: AllowedExtension } => {
	const extension = new FileService().getFileInfo(url).extension as AllowedExtension;

	if (/(mp4|m3u8|webm|mov|mkv)$/.test(extension)) return { mimeType: `video/${extension}`, extension };
	else if (/(mp3|wav|aac|flac|ogg)$/.test(extension)) return { mimeType: `audio/${extension}`, extension };
	else if (/(jpg|jpeg|png|gif|webp)$/.test(extension)) return { mimeType: `image/${extension}`, extension };

	switch (service) {
		case ServiceType.PornHub:
			return { mimeType: 'video/mp4', extension: 'mp4' };
		default:
			return { mimeType: 'application/octet-stream', extension: 'bin' };
	}
};
