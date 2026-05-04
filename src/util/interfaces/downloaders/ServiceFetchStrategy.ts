import { VideoQuality } from '../..';

export interface ServiceFetchStrategy {
	shouldFallback404?(url: string): boolean;
	getFallbackUrl?(url: string): string | null;
	shouldReExtract?(url: string): boolean;
	shouldResolveTextResponse?(url: string, contentType: string): boolean;
	getDirectVideoUrlFromText?(body: string, preferredQuality?: VideoQuality): string | null;
}
