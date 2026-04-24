import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { fetcher } from '../fetcher/http-fetcher';
import { parser } from '../parser';
import { DownloadResult, FetchOptions, PipelineTarget } from '../types';
import { DEFAULT_ALLOWED_EXTENSIONS } from '../helpers/constants';

export interface DownloadOptions extends FetchOptions {
  target: PipelineTarget;
  /** Required when target = LOCAL */
  outputDir?: string;
  /** Override the derived filename */
  filename?: string;
}

export class Downloader {
  /** Download a single file. Returns a DownloadResult with path or buffer. */
  public async downloadFile(url: string, opts: DownloadOptions): Promise<DownloadResult> {
    const { target, outputDir, filename: overrideName, ...fetchOpts } = opts;
    const { filename, extension } = parser.getFilenameAndExtensionFromUrl(url);
    const resolvedFilename = overrideName ?? `${filename}.${extension}`;
    const mimeType = parser.resolveMimeFromExtension(extension);

    const buffer = await fetcher.fetchBuffer(url, fetchOpts);

    const result: DownloadResult = {
      url,
      filename: resolvedFilename,
      extension,
      mimeType,
      sizeBytes: buffer.byteLength,
    };

    if (target === PipelineTarget.BUFFER) {
      result.buffer = buffer;
      return result;
    }

    // LOCAL: write to disk
    if (!outputDir) throw new Error('outputDir is required for PipelineTarget.LOCAL');
    
    mkdirSync(outputDir, { recursive: true });
    const localPath = join(outputDir, resolvedFilename);

    await pipeline(Readable.from(buffer), createWriteStream(localPath));

    result.localPath = localPath;
    return result;
  }

  /** Filter a list of URLs to only those with allowed file extensions. */
  public filterByExtension(urls: string[], allowed: string[] = DEFAULT_ALLOWED_EXTENSIONS): string[] {
    // If we have DEFAULT_ALLOWED_EXTENSIONS, we could use it, but parameter fallback is tricky with imports sometimes, so we'll handle it nicely
    const allowedList = allowed ?? [];
    return [
      ...new Set(
        urls.filter((url) => {
          const pathname = url.split('?')[0];
          const ext = `.${pathname.split('.').pop()?.toLowerCase()}`;
          return allowedList.includes(ext);
        }),
      ),
    ];
  }
}

export const downloader = new Downloader();
