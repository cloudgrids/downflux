/* eslint-disable @typescript-eslint/no-unused-vars */
import { DownloadOptions, ServiceStrategy } from '@app/contracts';
import { ProgressManager } from '@app/progress';

export class DefaultStrategy implements ServiceStrategy {
	constructor(protected readonly progressManager: ProgressManager) {}

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
