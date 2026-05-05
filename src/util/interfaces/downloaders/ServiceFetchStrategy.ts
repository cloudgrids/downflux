import { DownloadOptions } from '../..';

export interface ServiceFetchStrategy {
	shouldFallback404?(url: string, opts: DownloadOptions): boolean;
	getFallbackUrl?(url: string, opts: DownloadOptions): string | null;
	shouldReExtract?(url: string, opts: DownloadOptions): boolean;
	shouldResolveTextResponse?(url: string, contentType: string, opts: DownloadOptions): boolean;
	getDirectVideoUrlFromText?(body: string, opts: DownloadOptions): string | null;
}
