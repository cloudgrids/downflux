import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { ExecutionResult } from '../types/ExecutionResult';

export class FileService {
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

			const originalFilename = pathname.split('/').pop() ?? '';
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

	public resolveMimeFromExtension(ext: string): string {
		const map: Record<string, string> = {
			png: 'image/png',
			jpg: 'image/jpeg',
			jpeg: 'image/jpeg',
			gif: 'image/gif',
			webp: 'image/webp',
			mp4: 'video/mp4',
			webm: 'video/webm',
			mp3: 'audio/mpeg',
			wav: 'audio/wav'
		};
		return map[ext.toLowerCase()] ?? 'application/octet-stream';
	}

	public saveJson(result: ExecutionResult, dir: string = 'importer_json_output'): string {
		const base = join(process.cwd(), dir);
		if (!existsSync(base)) mkdirSync(base, { recursive: true });

		const file = join(base, `${dir}_${new Date().toISOString()}.json`);

		writeFileSync(file, JSON.stringify([result], this.replacer, 2));

		return file;
	}

	private replacer(key: string, value: any) {
		if (Buffer.isBuffer(value)) return `[Buffer ${value.byteLength} bytes]`;
		if (value instanceof Error) {
			return { name: value.name, message: value.message, stack: value.stack };
		}
		return value;
	}

	public async saveToDevice(buffer: Buffer, outputDir: string = 'importer_device_output', filename: string): Promise<string> {
		const path = join(process.cwd(), outputDir);

		if (!existsSync(path)) mkdirSync(path, { recursive: true });

		const localPath = join(path, filename);

		await pipeline(Readable.from(buffer), createWriteStream(localPath));

		return localPath;
	}
}
