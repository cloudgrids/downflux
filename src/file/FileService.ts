import { createWriteStream, promises as fs, mkdirSync, writeFileSync, WriteStream } from 'fs';
import { dirname, extname, isAbsolute, relative, resolve } from 'path';
import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';

import { MIME_TYPE } from '../common/MimeType';
import { OutputType, ServiceType } from '../enums';
import { InvalidDestinationException } from '../exceptions';
import { DownloadResult } from '../types';
import { ExecutionResult } from '../types/ExecutionResult';
import { ResolvedFile } from '../types/ResolvedFile';
import { FfmpegService } from './FFmpegService';
import { PathBuilderService } from './PathBuilderService';

export class FileService {
	private readonly pathBuilder = new PathBuilderService();
	private readonly ffmpegService = new FfmpegService();
	private readonly baseDir = 'downflux_';

	public createWriteTarget(
		service: ServiceType,
		directoryPath: string,
		filename: string,
		identifier?: string
	): { stream: WriteStream; finalPath: string } {
		const finalPath = this.getFilePath(service, directoryPath, filename, identifier);
		return {
			stream: createWriteStream(finalPath),
			finalPath
		};
	}

	public createMemoryTarget() {
		const chunks: Buffer[] = [];
		const stream = new Writable({
			write(chunk, encoding, callback) {
				chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
				callback();
			}
		});

		return {
			stream,
			getBuffer: () => Buffer.concat(chunks)
		};
	}

	public createSink(service: ServiceType, type: OutputType, opts: { directoryPath?: string; filename: string; identifier: string }) {
		if (type === OutputType.DEVICE) {
			const { stream, finalPath } = this.createWriteTarget(
				service,
				opts.directoryPath || this.baseDir,
				opts.filename,
				opts.identifier
			);

			return {
				stream,
				finalize: async (resolved: ResolvedFile, headers: Record<string, string>) => {
					const finalized = await this.finalizeStream(finalPath, {
						extension: resolved.extension,
						mimeType: MIME_TYPE[resolved.extension] ?? headers['content-type']?.split(';')[0]?.trim()
					});
					const stats = await fs.stat(finalized.path);
					return {
						originalFilename: finalized.filename,
						extendedFilename: finalized.filename,
						extension: finalized.extension,
						mimeType: finalized.mimeType,
						sizeBytes: stats.size,
						buffer: Buffer.alloc(0)
					};
				}
			};
		}

		const { stream, getBuffer } = this.createMemoryTarget();
		return {
			stream,
			finalize: async (resolved: ResolvedFile, headers: Record<string, string>) => {
				const buffer = getBuffer();
				return {
					originalFilename: resolved.originalFilename,
					extendedFilename: resolved.extendedFilename,
					extension: resolved.extension,
					mimeType: MIME_TYPE[resolved.extension] ?? headers['content-type']?.split(';')[0]?.trim() ?? 'application/octet-stream',
					sizeBytes: buffer.byteLength,
					buffer
				};
			}
		};
	}

	public async toDevice(
		downloadResult: DownloadResult,
		outputDir: string = this.baseDir,
		identifier?: string
	): Promise<{ path: string; filename: string; extension: string; mimeType: string }> {
		const { buffer, originalFilename, extendedFilename, mimeType, extension } = downloadResult;

		const { stream, finalPath } = this.createWriteTarget(downloadResult.service, outputDir, originalFilename, identifier);

		await pipeline(Readable.from(buffer), stream);

		if (finalPath.endsWith('.ts')) return this.ffmpegService.reMuxTransportStream(finalPath);

		return {
			path: finalPath,
			filename: extendedFilename || originalFilename,
			extension,
			mimeType
		};
	}

	public async finalizeStream(finalPath: string, opts?: { extension?: string; mimeType?: string }) {
		const extension = opts?.extension ?? extname(finalPath).substring(1).toLowerCase();
		const mimeType = opts?.mimeType ?? MIME_TYPE[extension] ?? 'video/mp2t';

		const isTsFile = finalPath.endsWith('.ts');

		if (isTsFile) return this.ffmpegService.reMuxTransportStream(finalPath);

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
	 * fallback => fb_timestamp
	 * path undefined => fud_timestamp
	 */
	public getFileInfo(url: string, prefix?: string): ResolvedFile {
		try {
			const pathname = new URL(url).pathname;
			const originalFilename = pathname.split('/').filter(Boolean).pop() || `fud_${Date.now()}`;
			const extension = extname(originalFilename).substring(1).toLowerCase();

			return {
				originalFilename,
				extension,
				extendedFilename: `${prefix ?? ''}${originalFilename}`
			};
		} catch {
			throw new Error('Unable to parse URL for file info');
		}
	}

	private getFilePath(service: ServiceType, directoryPath: string, filename: string, identifier?: string): string {
		if (!filename || filename.trim() === '') {
			throw new InvalidDestinationException(directoryPath, service, identifier ?? filename, {
				reason: 'Invalid filename'
			});
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
