import { createWriteStream, promises as fs, mkdirSync, writeFileSync } from 'fs';
import { dirname, extname, isAbsolute, relative, resolve } from 'path';
import { Writable } from 'stream';
import { InvalidDestinationException } from '../exceptions';
import {
	CreateSinkInput,
	CreateSinkOutput,
	DownloadOptions,
	ExecutionResult,
	MIME_TYPE,
	OutputType,
	ResolvedFile,
	ServiceType
} from '../util';
import { FfmpegService } from './FFmpegService';
import { PathBuilderService } from './PathBuilderService';

export class FileService {
	private readonly pathBuilder = new PathBuilderService();
	private readonly ffmpegService = new FfmpegService();
	private readonly baseDir = 'DownFlux';

	public createSink(sinkInput: CreateSinkInput) {
		switch (sinkInput.type) {
			case OutputType.DEVICE:
				return this.createDeviceSink(sinkInput);

			case OutputType.BUFFER:
				return this.createBufferSink(sinkInput);

			default:
				throw new Error('Unsupported output type');
		}
	}

	private createBufferSink(sinkInput: CreateSinkInput) {
		const chunks: Buffer[] = [];

		const stream = new Writable({
			write(chunk, _, cb) {
				chunks.push(chunk);
				cb();
			}
		});

		return {
			stream,
			finalize: async (resolved: ResolvedFile, headers: Record<string, string>): Promise<CreateSinkOutput> => {
				const buffer = Buffer.concat(chunks);

				return {
					buffer,
					sizeBytes: buffer.length,
					originalFilename: resolved.originalFilename,
					extendedFilename: resolved.extendedFilename,
					extension: resolved.extension,
					path: sinkInput.identifier, // No actual path, using identifier as reference to send buffer back to caller
					mimeType: MIME_TYPE[resolved.extension] ?? headers['content-type']?.split(';')[0]?.trim() ?? 'application/octet-stream'
				};
			}
		};
	}

	private createDeviceSink(sinkInput: CreateSinkInput) {
		const finalPath = this.getFilePath(
			sinkInput.service,
			sinkInput.directoryPath ?? this.baseDir,
			sinkInput.filename,
			sinkInput.identifier
		);

		const stream = createWriteStream(finalPath);

		return {
			stream,
			finalize: async (resolved: ResolvedFile, headers: Record<string, string>): Promise<CreateSinkOutput> => {
				const finalized = await this.finalizeStream(finalPath, sinkInput.dOptions, {
					extension: resolved.extension,
					mimeType: MIME_TYPE[resolved.extension] ?? headers['content-type']?.split(';')[0]?.trim()
				});

				const stats = await fs.stat(finalized.path);

				return {
					path: finalized.path,
					originalFilename: finalized.filename,
					extendedFilename: finalized.filename,
					mimeType: finalized.mimeType,
					extension: finalized.extension,
					sizeBytes: stats.size,
					buffer: Buffer.alloc(0)
				};
			}
		};
	}

	public async finalizeStream(finalPath: string, dOptions: DownloadOptions, opts?: { extension?: string; mimeType?: string }) {
		const extension = opts?.extension ?? extname(finalPath).substring(1).toLowerCase();
		const mimeType = opts?.mimeType ?? MIME_TYPE[extension] ?? 'video/mp2t';

		const isTsFile = finalPath.endsWith('.ts');

		if (isTsFile) return this.ffmpegService.reMuxTransportStream(finalPath, dOptions);

		return {
			path: finalPath,
			filename: finalPath.split('/').pop()!,
			extension,
			mimeType
		};
	}

	public toJSON(result: ExecutionResult, directoryPath: string = this.baseDir): string {
		const finalPath = this.getFilePath(result.service, directoryPath, `result_${Date.now()}.json`);

		writeFileSync(finalPath, JSON.stringify([result], this.replacer, 2));

		return finalPath;
	}

	private replacer(_: string, value: any) {
		if (Buffer.isBuffer(value)) return `[Buffer ${value.byteLength} bytes]`;
		if (value instanceof Error) {
			return { name: value.name, message: value.message, stack: value.stack };
		}
		return value;
	}

	/**
	 * Extracts filename and extension from URL.
	 * @param url - URL to extract filename and extension from
	 * @param prefix - Optional prefix to add to the filename
	 * @returns {{originalFilename: string, extension: string, extendedFilename: string}}
	 * path undefined => fud_timestamp
	 */
	public getFileInfo(url: string, prefix?: string): ResolvedFile {
		try {
			const pathname = new URL(url).pathname;
			const segments = pathname.split('/').filter(Boolean);

			const fileSegment = segments.find((seg) => /\.[a-z0-9]+$/i.test(seg));

			const originalFilename = fileSegment || segments.pop() || `fud_${Date.now()}`;

			const extension = extname(originalFilename).substring(1).toLowerCase();

			return {
				extension,
				originalFilename,
				extendedFilename: `${prefix ?? ''}${originalFilename}`
			};
		} catch {
			throw new Error(`Unable to parse URL for file info: ${url}`);
		}
	}

	// Sanitize filename by replacing invalid characters with underscores mostly for
	// Windows OS which has a lot of reserved characters for filenames such as < > : " / \ | ? *
	public sanitizeFilename(name: string): string {
		return name.replace(/[^a-z0-9._-]/gi, '_');
	}

	private getFilePath(service: ServiceType, directoryPath: string, filename: string, identifier?: string): string {
		if (!filename || filename.trim() === '') {
			throw new InvalidDestinationException(directoryPath, service, identifier ?? filename, { reason: 'Invalid filename' });
		}

		const dynamicPath = this.pathBuilder.buildDirectoryPath(filename, identifier);

		const baseDir = isAbsolute(directoryPath) ? directoryPath : resolve(process.cwd(), directoryPath);

		const finalPath = resolve(baseDir, dynamicPath);

		const rel = relative(baseDir, finalPath);

		if (rel.startsWith('..') || rel === '..') {
			throw new InvalidDestinationException(directoryPath, service, identifier ?? filename, {
				reason: 'Path traversal detected',
				finalPath
			});
		}

		try {
			mkdirSync(dirname(finalPath), { recursive: true });
		} catch (err) {
			throw new InvalidDestinationException(directoryPath, service, identifier ?? filename, {
				finalPath,
				cause: err
			});
		}

		return finalPath;
	}
}
