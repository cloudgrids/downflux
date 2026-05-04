import { ServiceType } from '../../enums';

/**
 * Result of a download operation.
 * Contains file metadata and the downloaded buffer.
 */
export interface DownloadResult {
	/** Requested download URL */
	url: string;

	/** Downloaded file buffer */
	buffer: Buffer;

	/** Final URL after redirects */
	finalUrl: string;

	/** Generated filename with metadata */
	extendedFilename: string;

	/** Original filename from URL or response */
	originalFilename: string;

	/** File extension */
	extension: string;

	/** MIME type */
	mimeType: string;

	/** File size in bytes */
	sizeBytes: number;

	/** Path of the downloaded file */
	path: string;

	/** Service used for the download */
	service: ServiceType;
}
