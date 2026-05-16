import { CreateSinkInput, CreateSinkOutput, ExecutionArgs, ExecutionResult, ResolvedFile, TranscodeOptions } from '@contracts';
import { InvalidDestinationException } from '@core/exceptions';
import { ProgressManager } from '@core/progress';
import { AllowedExtension, ExecutionShape, MIME_TYPE, OutputType, ProviderType } from '@types';
import { createWriteStream, promises as fs, mkdirSync, writeFileSync } from 'fs';
import { basename, dirname, extname, isAbsolute, relative, resolve } from 'path';
import { Writable } from 'stream';
import { FFmpegEngine } from './FFmpegEngine';
import { PathBuilder } from './PathBuilder';

export class FileManager {
	private readonly pathBuilder = new PathBuilder();

	private readonly baseDir = 'DownFlux';

	constructor(
		private readonly ffmpegEngine: FFmpegEngine,
		private readonly progressManager: ProgressManager
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
			sinkInput.provider,
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

		if (isTsFile || isFmp4) return this.ffmpegEngine.finalizeMedia({ ...tOptions, inputPath: finalPath });

		return {
			path: finalPath,
			filename: finalPath.split('/').pop()!,
			extension,
			mimeType
		};
	}

	public toJSON<T, S extends ExecutionShape>(result: ExecutionResult<T, S>, directoryPath: string = this.baseDir): string {
		const finalPath = this.getFilePath(result.provider, directoryPath, `${result.provider}_${Date.now()}.json`);

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
			const parsed = new URL(url);

			const segments = parsed.pathname.split('/').filter(Boolean);

			const fileSegment = [...segments].reverse().find((seg) => /^[^/?#]+\.[a-z0-9]{2,10}$/i.test(seg));

			const originalFilename = (fileSegment ?? basename(parsed.pathname)) || `fud_${Date.now()}`;

			const extension = extname(originalFilename).replace('.', '').toLowerCase();

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

	private getFilePath(provider: ProviderType, directoryPath: string, filename: string, identifier?: string): string {
		if (!filename || filename.trim() === '') {
			throw new InvalidDestinationException(directoryPath, provider, identifier ?? filename, { reason: 'Invalid filename' });
		}

		const dynamicPath = this.pathBuilder.buildDirectoryPath(filename, identifier);

		const baseDir = isAbsolute(directoryPath) ? directoryPath : resolve(process.cwd(), directoryPath);

		const finalPath = resolve(baseDir, dynamicPath);

		const rel = relative(baseDir, finalPath);

		if (rel.startsWith('..') || rel === '..') {
			throw new InvalidDestinationException(directoryPath, provider, identifier ?? filename, {
				reason: 'Path traversal detected',
				finalPath
			});
		}

		try {
			mkdirSync(dirname(finalPath), { recursive: true });
		} catch (err) {
			throw new InvalidDestinationException(directoryPath, provider, identifier ?? filename, {
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

		const message = { message: `[${request.provider}]Resolving resource type to default` };

		switch (request.provider) {
			case ProviderType.XnXX:
			case ProviderType.PornHub:
			case ProviderType.XVideos:
			case ProviderType.XHamster:
			case ProviderType.Beeg:
			case ProviderType.PussySpace:
			case ProviderType.PornsOk: {
				this.progressManager.update(message);
				return { mimeType: 'video/mp4', extension: 'mp4' };
			}

			default: {
				this.progressManager.update(message);
				return { mimeType: 'application/octet-stream', extension: 'bin' };
			}
		}
	}

	public deriveResolvedFile(
		initial: ResolvedFile,
		finalUrl: string,
		headers: Record<string, string>,
		isFmp4?: boolean,
		prefix?: string
	): ResolvedFile {
		const isHls = finalUrl.includes('.m3u8') || headers['content-type']?.includes('application/vnd.apple.mpegurl');

		if (isHls) {
			// const container = headers['x-hls-container']; --- IGNORE ---

			const extension = isFmp4 ? 'mp4' : 'ts';

			const baseName = this.sanitizeFilename(initial.originalFilename.replace(/\.[^.]+$/, '') || 'video');

			return {
				originalFilename: `${baseName}.${extension}`,
				extension,
				extendedFilename: `${prefix ?? ''}${baseName}.${extension}`
			};
		} else if (initial.extension) return initial;

		const fallback = this.getFileInfo(finalUrl, prefix);
		if (fallback.extension) return fallback;

		return initial;
	}
}
