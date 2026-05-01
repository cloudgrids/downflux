import { ServiceType } from '../../enums';

export interface DownloadResult {
	/** The URL from which the file was downloaded */
	url: string;
	/** The buffer containing the downloaded file */
	buffer: Buffer;
	/** The final URL after any redirects */
	finalUrl: string;
	/** The extended filename with additional information */
	extendedFilename: string;
	/** The original filename before any modifications */
	originalFilename: string;
	/** The file extension */
	extension: string;
	/** The MIME type of the downloaded file */
	mimeType: string;
	/** The size of the downloaded file in bytes */
	sizeBytes: number;
	/** The service type used for downloading */
	service: ServiceType;
}
