import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { ProgressService } from '../progress';
import { TranscodeOptions } from '../util';

const execFileAsync = promisify(execFile);

export class FfmpegService {
	constructor(private readonly progressService: ProgressService) {}

	public get ffmpeg(): string {
		return ffmpegPath ?? 'ffmpeg';
	}

	public async finalizeMedia(options: TranscodeOptions) {
		if (!ffmpegPath) throw new Error('ffmpeg-static not found');

		if (!options.inputPath) throw new Error('Input path is required for finalizing media');

		const { inputPath, outputExtension = 'mp4', deleteInput = true, ffmpegArgs = [], videoCodec, audioCodec, crf, preset } = options;

		const dir = path.dirname(inputPath);

		const base = path.basename(inputPath, path.extname(inputPath));

		const outputFilename = `${base}_final.${outputExtension}`;

		const outputPath = path.join(dir, outputFilename);

		this.progressService.update({
			message: `Finalizing media ${inputPath} with options ${JSON.stringify(options)} ` + `to ${outputPath} using ffmpeg...`
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

		console.log(`Running ffmpeg with args: ${args}`);

		try {
			await execFileAsync(ffmpegPath, args);

			if (deleteInput) {
				await fs.unlink(inputPath);
			}

			return {
				path: outputPath,

				filename: outputFilename,

				extension: outputExtension,

				mimeType: `video/${outputExtension}`
			};
		} catch (error) {
			throw new Error(`Failed to finalize media: ${(error as Error).message}`, { cause: error });
		}
	}
}
