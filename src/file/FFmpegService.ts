import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { ProgressService } from '../progress';

const execFileAsync = promisify(execFile);

export class FfmpegService {
	constructor(private readonly progressService: ProgressService) {}

	public get ffmpeg(): string {
		return ffmpegPath ?? 'ffmpeg';
	}

	public async reMuxTransportStream(inputPath: string) {
		if (!ffmpegPath) throw new Error('ffmpeg-static not found');

		const dir = path.dirname(inputPath);
		const base = path.basename(inputPath, path.extname(inputPath));

		const outputPath = path.join(dir, `${base}.mp4`);
		const filename = `${base}.mp4`;

		this.progressService.update({ message: `Re-muxing ${inputPath} to ${outputPath} using ffmpeg...` });

		try {
			await execFileAsync(ffmpegPath, [
				'-y',
				'-loglevel',
				'error',
				'-i',
				inputPath,
				'-c',
				'copy',
				'-movflags',
				'+faststart',
				outputPath
			]);

			await fs.unlink(inputPath);

			return {
				path: outputPath,
				filename,
				extension: 'mp4',
				mimeType: 'video/mp4'
			};
		} catch (error) {
			throw new Error(`Failed to re-mux transport stream: ${(error as Error).message}`, { cause: error });
		}
	}
}
