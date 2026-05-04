export interface CreateSinkOutput {
	originalFilename: string;
	extension: string;
	extendedFilename: string;
	mimeType: string;
	sizeBytes: number;
	path: string;
	buffer: Buffer;
}
