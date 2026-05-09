import { DownloadOptions } from './DownloadOptions';

export interface ServiceStrategy {
	shouldFallback404?(url: string): boolean;
	getFallbackUrl?(url: string): string | null;
	shouldReExtract?(url: string): boolean;
	shouldResolveTextResponse?(url: string, contentType: string): boolean;
	getDirectVideoUrlFromText?(body: string, opts: DownloadOptions): string | null;
	getHostFallbackUrls?(url: string): string[];
}
