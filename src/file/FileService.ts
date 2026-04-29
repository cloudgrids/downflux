import { execFile } from 'child_process';
import { createWriteStream, existsSync, promises as fs, mkdirSync, writeFileSync, WriteStream } from 'fs';
import { dirname, extname, isAbsolute, resolve } from 'path';
import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { promisify } from 'util';

import { MIME_TYPE } from '../common/MimeType';
import { OutputType } from '../enums';
import { DownloadResult } from '../types';
import { ExecutionResult } from '../types/ExecutionResult';
import { ResolvedFile } from '../types/ResolvedFile';
import { PathBuilderService } from './PathBuilderService';

const execFileAsync = promisify(execFile);

export class FileService {
	private readonly pathBuilder = new PathBuilderService();
	private readonly baseDir = 'downflux_';

	public createWriteTarget(directoryPath: string, filename: string, identifier?: string): { stream: WriteStream; finalPath: string } {
		const finalPath = this.getFilePath(directoryPath, filename, identifier);

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

	public createSink(type: OutputType, opts: { directoryPath?: string; filename: string; identifier?: string }) {
		if (type === OutputType.DEVICE) {
			const { stream, finalPath } = this.createWriteTarget(opts.directoryPath || this.baseDir, opts.filename, opts.identifier);

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

		const { stream, finalPath } = this.createWriteTarget(outputDir, originalFilename, identifier);

		await pipeline(Readable.from(buffer), stream);

		if (finalPath.endsWith('.ts')) return this.reMuxTransportStream(finalPath);

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

		console.log({ opts, extension, mimeType, isTsFile });

		if (isTsFile) return this.reMuxTransportStream(finalPath);

		return {
			path: finalPath,
			filename: finalPath.split('/').pop()!,
			extension,
			mimeType
		};
	}

	private async reMuxTransportStream(inputPath: string) {
		// if (!ffmpegPath) throw new Error('ffmpeg-static not found');

		const outputPath = inputPath.endsWith('.ts') ? inputPath.replace(/\.ts$/i, '.mp4') : inputPath + '.remux.mp4';
		const filename = outputPath.split('/').pop()!;

		try {
			await execFileAsync('/opt/homebrew/bin/ffmpeg', [
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
			console.error(`Failed to remux ${inputPath}:`, error);
			return {
				path: inputPath,
				filename: inputPath.split('/').pop()!,
				extension: 'ts',
				mimeType: 'video/mp2t'
			};
		}
	}

	public toJSON(result: ExecutionResult, directoryPath: string = this.baseDir): string {
		const finalPath = this.getFilePath(directoryPath, `result_${Date.now()}.json`);

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
		} catch (error) {
			console.error('Failed to get filename and extension from URL:', error);
			const fallback = `fb_${Date.now()}`;
			return {
				originalFilename: fallback,
				extension: '',
				extendedFilename: `${prefix ?? ''}${fallback}`
			};
		}
	}

	private getFilePath(directoryPath: string, filename: string, identifier?: string) {
		const dynamicPath = this.pathBuilder.buildOutputPath(directoryPath, filename, identifier);

		const finalPath = isAbsolute(dynamicPath) ? dynamicPath : resolve(process.cwd(), dynamicPath);

		const dir = dirname(finalPath);
		if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

		return finalPath;
	}
}
