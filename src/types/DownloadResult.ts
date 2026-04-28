import { ServiceType } from '../enums';

export interface DownloadResult {
	url: string;
	buffer: Buffer;
	finalUrl: string;
	extendedFilename: string;
	originalFilename: string;
	extension: string;
	mimeType: string;
	sizeBytes: number;
	service: ServiceType;
}
