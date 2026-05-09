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
