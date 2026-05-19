import { BaseStrategy } from '@base';
import { DownloadOptions } from '@contracts';
import { VideoQuality } from '@types';
import { PornHubMediaDefinition } from './PornHubContracts';

/**
 * Provides PornHub-specific HTTP behavior.
 *
 * @remarks
 * Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.
 */
export class PornHubStrategy extends BaseStrategy {
	private SUB_DOMAINS = [
		'pornhub.com',
		'pornhub.org',
		'de.pornhub.org',
		'es.pornhub.org',
		'fr.pornhub.org',
		'it.pornhub.org',
		'jp.pornhub.org',
		'nl.pornhub.org',
		'pl.pornhub.org'
	];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}

	public shouldFallback404(url: string) {
		return url.includes('phncdn.com');
	}

	public getFallbackUrl(url: string) {
		this.progressManager.update({ message: '[Switch CDN IF POSSIBLE]' });

		if (url.includes('iv-h')) return url.replace('iv-h', 'ev-h');
		if (url.includes('ev-h')) return url.replace('ev-h', 'iv-h');
		return null;
	}

	public shouldReExtract(url: string) {
		this.progressManager.update({ message: 'CHECKING FOR RE-EXTRACTION' });

		return url.includes('phncdn.com') && url.includes('.m3u8');
	}

	public shouldResolveTextResponse(url: string, contentType: string) {
		return (
			(url.includes('/get_file/') || url.includes('/get_media')) &&
			(contentType.includes('text/') || contentType.includes('application/json'))
		);
	}

	public getDirectVideoUrlFromText(body: string, opts: DownloadOptions) {
		this.progressManager.update({ message: 'GETTING DIRECT URL FROM TEXT' });

		const normalized = body.replace(/\\\//g, '/').replace(/&amp;/g, '&');

		try {
			const definitions = JSON.parse(normalized) as PornHubMediaDefinition[];
			if (Array.isArray(definitions)) {
				this.progressManager.update({ message: 'PARSED MEDIA DEFINITIONS' });

				const mp4Definitions = definitions
					.filter((definition) => definition.format === 'mp4' && definition.videoUrl)
					.sort((a, b) => (b?.height || Number(b.quality ?? 0)) - (a?.height || Number(a.quality ?? 0)));

				const preferred = opts?.allowedVideoQuality
					? mp4Definitions?.find((definition) => !!this.normalizeQuality(definition, opts?.allowedVideoQuality))?.videoUrl
					: mp4Definitions[0]?.videoUrl;

				if (opts.noDownload) {
					this.progressManager.update({
						message: `NO DOWNLOAD MODE - SELECTED VIDEO URL: ${preferred} DEFINITION: ${mp4Definitions}`
					});
				}

				return preferred ?? null;
			}
		} catch {
			this.progressManager.update({ message: 'FALLING BACK TO PREVIOUS URL' });
		}

		const match = normalized.match(/https?:\/\/[^\s"'<>\\]+\.mp4(?:\?[^\s"'<>\\]*)?/i);
		return match?.[0] ?? null;
	}

	private normalizeQuality(definition: PornHubMediaDefinition, preferred?: VideoQuality): boolean | undefined {
		const pq = preferred || VideoQuality.Q1080;
		if (definition.height) return `${definition.height}p` === pq;
		else if (definition.quality) return `${definition.quality}p` === pq;
	}
}
