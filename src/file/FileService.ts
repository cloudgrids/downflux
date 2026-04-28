import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { ExecutionResult } from '../types/ExecutionResult';
import { PathBuilderService } from './PathBuilderService';

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

	public async saveToDevice(buffer: Buffer, outputDir: string = this.dir, filename: string, identifier?: string): Promise<string> {
		const dynamicPath = this.pathBuilder.buildOutputPath(outputDir, identifier, filename);

		const dirPath = dynamicPath.substring(0, dynamicPath.lastIndexOf('/'));
		const finalPath = join(process.cwd(), dynamicPath);

		if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });

		await pipeline(Readable.from(buffer), createWriteStream(finalPath));

		return finalPath;
	}
}
