/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProgressService } from '../progress';
import { DownloadOptions, ServiceStrategy } from '../util';

export class BaseStrategy implements ServiceStrategy {
	constructor(protected readonly progressService: ProgressService) {}

	public shouldFallback404(url: string): boolean {
		return false;
	}

	public getDirectVideoUrlFromText(body: string, opts: DownloadOptions): string | null {
		return '';
	}

	public getHostFallbackUrls(url: string): string[] {
		return [url];
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
