import { createWriteStream, promises as fs, mkdirSync, writeFileSync } from 'fs';
import { dirname, extname, isAbsolute, relative, resolve } from 'path';
import { Writable } from 'stream';
import { InvalidDestinationException } from '../exceptions';
import { ProgressService } from '../progress';
import {
	AllowedExtension,
	CreateSinkInput,
	CreateSinkOutput,
	ExecutionArgs,
	ExecutionResult,
	MIME_TYPE,
	OutputType,
	ResolvedFile,
	ServiceType,
	TranscodeOptions
} from '../util';
import { FfmpegService } from './FFmpegService';
import { PathBuilderService } from './PathBuilderService';

export class FileService {
	private readonly pathBuilder = new PathBuilderService();

	private readonly baseDir = 'DownFlux';

	constructor(
		private readonly ffmpegService: FfmpegService,
		private readonly progressService: ProgressService
	) {}

	public createSink(sinkInput: CreateSinkInput) {
		if (sinkInput.noDownload) return this.createNoDownloadSink(sinkInput);

		switch (sinkInput.type) {
			case OutputType.DEVICE:
				return this.createDeviceSink(sinkInput);

			case OutputType.BUFFER:
				return this.createBufferSink(sinkInput);

			default:
				throw new Error('Unsupported output type');
		}
	}

	private createNoDownloadSink(sinkInput: CreateSinkInput) {
		let bytes = 0;

		const stream = new Writable({
			write(chunk, _, cb) {
				bytes += chunk.length;
				cb();
			}
		});

		return {
			stream,
			finalize: async (resolved: ResolvedFile, headers: Record<string, string>, isFmp4?: boolean): Promise<CreateSinkOutput> => ({
				path: sinkInput.identifier,
				originalFilename: resolved.originalFilename,
				extendedFilename: resolved.extendedFilename,
				extension: resolved.extension,
				mimeType: MIME_TYPE[resolved.extension] ?? headers['content-type']?.split(';')[0]?.trim() ?? 'application/octet-stream',
				sizeBytes: bytes,
				buffer: Buffer.alloc(0),
				isFmp4
			})
		};
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
			finalize: async (resolved: ResolvedFile, headers: Record<string, string>, isFmp4?: boolean): Promise<CreateSinkOutput> => {
				const buffer = Buffer.concat(chunks);
				console.log({ bufferLength: buffer.length, expectedSize: headers['content-length'], isFmp4 });

				return {
					buffer,
					sizeBytes: buffer.length,
					originalFilename: resolved.originalFilename,
					extendedFilename: resolved.extendedFilename,
					extension: resolved.extension,
					path: sinkInput.identifier, // No actual path, using identifier as reference to send buffer back to caller
					mimeType: MIME_TYPE[resolved.extension] ?? headers['content-type']?.split(';')[0]?.trim() ?? 'application/octet-stream',
					isFmp4
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
			finalize: async (resolved: ResolvedFile, headers: Record<string, string>, isFmp4?: boolean): Promise<CreateSinkOutput> => {
				const finalized = await this.finalizeStream(finalPath, sinkInput.transCodeOptions, isFmp4, {
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
					buffer: Buffer.alloc(0),
					isFmp4
				};
			}
		};
	}

	public async finalizeStream(
		finalPath: string,
		tOptions?: TranscodeOptions,
		isFmp4?: boolean,
		opts?: { extension?: string; mimeType?: string }
	) {
		const extension = opts?.extension ?? extname(finalPath).substring(1).toLowerCase();
		const mimeType = opts?.mimeType ?? MIME_TYPE[extension] ?? 'video/mp2t';

		const isTsFile = finalPath.endsWith('.ts');

		if (isTsFile || isFmp4) return this.ffmpegService.finalizeMedia({ ...tOptions, inputPath: finalPath });

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
			const normalizedFilename = originalFilename.replace(/\./g, '_');

			const extension = extname(originalFilename).substring(1).toLowerCase();

			return {
				extension,
				originalFilename: normalizedFilename,
				extendedFilename: `${prefix ?? ''}${normalizedFilename}`
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

	public detectResourceType(url: string, request: ExecutionArgs): { mimeType: string; extension: AllowedExtension } {
		const extension = this.getFileInfo(url).extension as AllowedExtension;

		if (/(mp4|webm|mov|mkv)$/.test(extension)) return { mimeType: `video/${extension}`, extension };
		else if (/(mp3|wav|aac|flac|ogg)$/.test(extension)) return { mimeType: `audio/${extension}`, extension };
		else if (/(jpg|jpeg|png|gif|webp)$/.test(extension)) return { mimeType: `image/${extension}`, extension };

		switch (request.service) {
			case ServiceType.PornHub: {
				this.progressService.update({ message: `[${request.service}]Resolving resource type to default: ${url}` });

				return { mimeType: 'video/mp4', extension: 'mp4' };
			}

			case ServiceType.XHamster: {
				this.progressService.update({ message: `[${request.service}]Resolving resource type to default: ${url}` });

				return { mimeType: 'video/mp4', extension: 'mp4' };
			}

			default: {
				this.progressService.update({ message: `[${request.service}]Resolving resource type to default: ${url}` });

				return { mimeType: 'application/octet-stream', extension: 'bin' };
			}
		}
	}
}
