import { FileService } from '../file';
import { AllowedExtension, ExecutionArgs, ServiceType } from '../util';
import { emitProgress } from './Emitter';

export const detectResourceType = (url: string, request: ExecutionArgs): { mimeType: string; extension: AllowedExtension } => {
	const extension = new FileService().getFileInfo(url).extension as AllowedExtension;

	if (/(mp4|m3u8|webm|mov|mkv)$/.test(extension)) return { mimeType: `video/${extension}`, extension };
	else if (/(mp3|wav|aac|flac|ogg)$/.test(extension)) return { mimeType: `audio/${extension}`, extension };
	else if (/(jpg|jpeg|png|gif|webp)$/.test(extension)) return { mimeType: `image/${extension}`, extension };

	switch (request.service) {
		case ServiceType.PornHub: {
			emitProgress(request, { status: 'PIPELINE', message: `[${request.service}]\nResolving resource type to default: ${url}` });

			return { mimeType: 'video/mp4', extension: 'mp4' };
		}
		default: {
			emitProgress(request, { status: 'PIPELINE', message: `[${request.service}]\nResolving resource type to default: ${url}` });
			return { mimeType: 'application/octet-stream', extension: 'bin' };
		}
	}
};
