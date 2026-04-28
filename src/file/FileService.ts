import { execFile } from 'child_process';
import { createWriteStream, existsSync, promises as fs, mkdirSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { promisify } from 'util';
import { ExecutionResult } from '../types/ExecutionResult';
import { PathBuilderService } from './PathBuilderService';

const execFileAsync = promisify(execFile);

export class FileService {
	private readonly pathBuilder = new PathBuilderService();
	private readonly dir = 'downflux_';

	public getFilenameAndExtensionFromUrl(
		url: string,
		prefix?: string
	): {
		originalFilename: string;
		extension: string;
		extendedFilename: string;
	} {
		const originalFilename = `file-${Date.now().toLocaleString()}`;
		const extension = '';
		const extendedFilename = `${prefix ? prefix : ''}${originalFilename}`;

		const result = {
			originalFilename,
			extension,
			extendedFilename
		};

		try {
			const pathname = new URL(url).pathname.split('?')[0];
			const originalFilename = pathname.split('/').filter(Boolean).pop() ?? '';
			const extension = extname(originalFilename).substring(1);

			if (extension)
				return {
					originalFilename,
					extension,
					extendedFilename: `${prefix ? prefix : ''}${originalFilename}`
				};

			return {
				originalFilename,
				extension,
				extendedFilename
			};
		} catch {
			return result;
		}
	}

	public saveJson(result: ExecutionResult, dir: string = this.dir): string {
		const base = join(process.cwd(), dir);
		if (!existsSync(base)) mkdirSync(base, { recursive: true });

		const file = join(base, `${dir}_${new Date().toISOString()}.json`);

		writeFileSync(file, JSON.stringify([result], this.replacer, 2));

		return file;
	}

	private replacer(_: string, value: any) {
		if (Buffer.isBuffer(value)) return `[Buffer ${value.byteLength} bytes]`;
		if (value instanceof Error) {
			return { name: value.name, message: value.message, stack: value.stack };
		}
		return value;
	}

	public async saveToDevice(
		buffer: Buffer,
		outputDir: string = this.dir,
		filename: string,
		identifier?: string,
		opts?: { extension?: string; mimeType?: string }
	): Promise<{ path: string; filename: string; extension: string; mimeType: string }> {
		const dynamicPath = this.pathBuilder.buildOutputPath(outputDir, identifier, filename);

		const dirPath = dynamicPath.substring(0, dynamicPath.lastIndexOf('/'));
		const finalPath = join(process.cwd(), dynamicPath);

		if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });

		await pipeline(Readable.from(buffer), createWriteStream(finalPath));

		const extension = opts?.extension ?? extname(filename).substring(1).toLowerCase();
		const mimeType = opts?.mimeType ?? 'application/octet-stream';

		if (extension === 'ts' || mimeType === 'video/mp2t') {
			return await this.remuxTransportStream(finalPath, mimeType);
		}

		return {
			path: finalPath,
			filename,
			extension,
			mimeType
		};
	}

	private async remuxTransportStream(
		inputPath: string,
		inputMimeType: string
	): Promise<{ path: string; filename: string; extension: string; mimeType: string }> {
		const outputPath = inputPath.replace(/\.ts$/i, '.mp4');
		const outputFilename = outputPath.split('/').pop() ?? 'video.mp4';

		try {
			await execFileAsync('/opt/homebrew/bin/ffmpeg', [
				'-y',
				'-hide_banner',
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
				filename: outputFilename,
				extension: 'mp4',
				mimeType: 'video/mp4'
			};
		} catch {
			return {
				path: inputPath,
				filename: inputPath.split('/').pop() ?? 'video.ts',
				extension: 'ts',
				mimeType: inputMimeType
			};
		}
	}
}
