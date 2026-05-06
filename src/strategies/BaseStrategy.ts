/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileService } from '../file';
import { ProgressService } from '../progress';
import { DownloadOptions } from '../util';

export class BaseStrategy {
	constructor(
		protected readonly progressService: ProgressService,
		protected fileService: FileService
	) {}

	public shouldFallback404(url: string): boolean {
		return false;
	}

	public getDirectVideoUrlFromText(body: string, opts: DownloadOptions): string | null {
		return '';
	}

	public getFallbackUrl(url: string): string | null {
		return url;
	}

	public shouldReExtract(url: string): boolean {
		return false;
	}

	public shouldResolveTextResponse(url: string, contentType: string): boolean {
		return false;
	}
}
