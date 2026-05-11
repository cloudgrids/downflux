import { OutputType, ProviderType } from '@types';

export interface CreateSinkInput {
	provider: ProviderType;
	type: OutputType;
	transCodeOptions?: TranscodeOptions;
	directoryPath?: string;
	filename: string;
	identifier: string;
	noDownload?: boolean; // Optional flag to indicate if the sink is being created for a no-download scenario (metadata extraction only)
}

export interface CreateSinkOutput {
	originalFilename: string;
	extension: string;
	extendedFilename: string;
	mimeType: string;
	sizeBytes: number;
	path: string;
	buffer: Buffer;
	isFmp4?: boolean;
}

export interface ResolvedFile {
	originalFilename: string;
	extension: string;
	extendedFilename: string;
}

export interface TranscodeOptions {
	inputPath?: string;

	deleteInput?: boolean;

	ffmpegArgs?: string[];

	outputExtension?: string;

	preset?: 'ultrafast' | 'superfast' | 'veryfast' | 'faster' | 'fast' | 'medium' | 'slow';

	crf?: number;

	videoCodec?: string;

	audioCodec?: string;
}

/**
 * Directory output options.
 * Controls where downloaded files are written.
 */
export interface DirectoryOutputOptions {
	/**
	 * Directory path for written files
	 * @defaultValue process.cwd()
	 */
	directoryPath?: string;

	/** Filename prefix */
	prefix?: string;
}
