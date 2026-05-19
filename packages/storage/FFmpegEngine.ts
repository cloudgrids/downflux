import { TranscodeOptions } from '@contracts';
import { ProgressManager } from '@core/progress';
import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { accessSync, constants, promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

/**
 * Media finalization wrapper around ffmpeg.
 *
 * @remarks
 * FFmpeg support lives in storage because container repair and transcoding are
 * output concerns. Downloaders write bytes first, then this engine remuxes or
 * transcodes formats such as HLS `.ts`/fMP4 into a playable final file.
 */
export class FFmpegEngine {
	constructor(private readonly progressManager: ProgressManager) {}

	public get ffmpeg(): string {
		return ffmpegPath && this.pathExists(ffmpegPath) ? ffmpegPath : 'ffmpeg';
	}

	/**
	 * Finalizes a downloaded media file with ffmpeg.
	 *
	 * @param options Input path and optional codec/transcode settings.
	 * @returns Final media path, filename, extension, and MIME type.
	 */
	public async finalizeMedia(options: TranscodeOptions) {
		if (!options.inputPath) throw new Error('Input path is required for finalizing media');

		const { inputPath, outputExtension = 'mp4', deleteInput = true, ffmpegArgs = [], videoCodec, audioCodec, crf, preset } = options;

		const dir = path.dirname(inputPath);

		const base = path.basename(inputPath, path.extname(inputPath));

		const outputFilename = `${base}_final.${outputExtension}`;

		const outputPath = path.join(dir, outputFilename);

		this.progressManager.update({
			message:
				`Finalizing media ${inputPath} with options ${JSON.stringify(options)} ` +
				`to ${outputPath} using ${this.resolveFfmpeg(options)}...`
		});

		let args: string[];

		// fully custom ffmpeg args
		if (ffmpegArgs.length) args = ffmpegArgs;
		else {
			const codecArgs: string[] = [];

			if (videoCodec) {
				codecArgs.push('-c:v', videoCodec);
				if (videoCodec === 'libx264') codecArgs.push('-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2');
			} else codecArgs.push('-c:v', 'copy');

			if (audioCodec) codecArgs.push('-c:a', audioCodec);
			else codecArgs.push('-c:a', 'copy');

			if (crf !== undefined && videoCodec && videoCodec !== 'copy') codecArgs.push('-crf', String(crf));
			if (preset && videoCodec && videoCodec !== 'copy') codecArgs.push('-preset', preset);

			args = ['-y', '-loglevel', 'error', '-i', inputPath, ...codecArgs, '-movflags', '+faststart', outputPath];
		}

		try {
			await execFileAsync(this.resolveFfmpeg(options), args);

			if (deleteInput) await fs.unlink(inputPath);

			return {
				path: outputPath,
				filename: outputFilename,
				extension: outputExtension,
				mimeType: `video/${outputExtension}`
			};
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
				throw new Error(
					'Failed to finalize media: ffmpeg executable was not found. Install ffmpeg on your system, allow ffmpeg-static build scripts in your package manager, or pass transcodeOptions.ffmpegPath.',
					{ cause: error }
				);
			}

			throw new Error(`Failed to finalize media: ${(error as Error).message}`, { cause: error });
		}
	}

	private resolveFfmpeg(options?: TranscodeOptions): string {
		if (options?.ffmpegPath) return options.ffmpegPath;

		return this.ffmpeg;
	}

	private pathExists(filePath: string): boolean {
		try {
			accessSync(filePath, constants.X_OK);
			return true;
		} catch {
			return false;
		}
	}
}
