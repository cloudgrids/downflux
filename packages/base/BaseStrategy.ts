/* eslint-disable @typescript-eslint/no-unused-vars */

import { DownloadOptions, ServiceStrategy } from '@contracts';
import { ProgressManager } from '@core/progress';

export class BaseStrategy implements ServiceStrategy {
	constructor(protected readonly progressManager: ProgressManager) {}

	public shouldFallback404(url: string): boolean {
		return false;
	}

	public getDirectVideoUrlFromText(body: string, opts: DownloadOptions): string | null {
		return '';
	}

	public getHostFallbackUrls(url: string, subDomains: string[] = []): string[] {
		let parsed: URL;

		try {
			parsed = new URL(url);
		} catch {
			return [url];
		}

		return Array.from(new Set([url, ...subDomains.map((host) => `${parsed.protocol}//${host}${this.constructPathname(parsed)}`)]));
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

	protected constructPathname(url: URL): string {
		return `${url.pathname}${url.search}${url.hash}`;
	}
}
