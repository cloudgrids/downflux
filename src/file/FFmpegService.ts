import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export class FfmpegService {
	public get ffmpeg(): string {
		return ffmpegPath ?? 'ffmpeg';
	}

	public async reMuxTransportStream(inputPath: string) {
		if (!ffmpegPath) throw new Error('ffmpeg-static not found');

		const outputPath = inputPath.endsWith('.ts') ? inputPath.replace(/\.ts$/i, '.mp4') : inputPath + '.remux.mp4';
		const filename = outputPath.split('/').pop()!;

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
