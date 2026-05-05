import { PornHubMediaDefinition, ServiceFetchStrategy, VideoQuality } from '../util';

export const PornHubFetchStrategy: ServiceFetchStrategy = {
	shouldFallback404: (url) => url.includes('phncdn.com'),

	getFallbackUrl: (url, opts) => {
		opts.onProgress?.({ message: `\nCHECKING IF FALLBACK URL IS NEEDED FOR URL[Switching CDN]:${url}`, status: 'DOWNLOADING' });

		if (url.includes('iv-h')) return url.replace('iv-h', 'ev-h');
		if (url.includes('ev-h')) return url.replace('ev-h', 'iv-h');
		return null;
	},

	shouldReExtract: (url, opts) => {
		opts.onProgress?.({ message: `\nCHECKING IF RE-EXTRACTION IS NEEDED FOR URL::${url}`, status: 'DOWNLOADING' });

		return url.includes('phncdn.com') && url.includes('.m3u8');
	},

	shouldResolveTextResponse: (url, contentType) => {
		return (
			(url.includes('/get_file/') || url.includes('/get_media')) &&
			(contentType.includes('text/') || contentType.includes('application/json'))
		);
	},

	getDirectVideoUrlFromText: (body, opts) => {
		opts.onProgress?.({
			status: 'DOWNLOADING',
			message: `GET DIRECT VIDEO URL FROM TEXT RESPONSE FOR PREFERRED QUALITY, ${opts?.allowedVideoQuality}`
		});

		const normalized = body.replace(/\\\//g, '/').replace(/&amp;/g, '&');

		opts.onProgress?.({
			status: 'DOWNLOADING',
			message: 'NORMALIZE TEXT RESPONSE FOR URL RESOLUTION'
		});
		try {
			const definitions = JSON.parse(normalized) as PornHubMediaDefinition[];
			if (Array.isArray(definitions)) {
				opts.onProgress?.({
					status: 'DOWNLOADING',
					message: `PARSED MEDIA DEFINITIONS LENGTH FROM TEXT RESPONSE:, ${definitions.length}`
				});

				const mp4Definitions = definitions
					.filter((definition) => definition.format === 'mp4' && definition.videoUrl)
					.sort((a, b) => (b?.height || 0) - (a?.height || 0));

				const preferred = opts?.allowedVideoQuality
					? mp4Definitions?.find((definition) => !!normalizeQuality(definition, opts?.allowedVideoQuality))?.videoUrl
					: mp4Definitions[0]?.videoUrl;

				return preferred ?? null;
			}
		} catch {
			opts.onProgress?.({
				status: 'DOWNLOADING',
				message: 'Fall back to extracting a URL from non-JSON text responses.'
			});
		}

		const match = normalized.match(/https?:\/\/[^\s"'<>\\]+\.mp4(?:\?[^\s"'<>\\]*)?/i);
		return match?.[0] ?? null;
	}
};

function normalizeQuality(definition: PornHubMediaDefinition, preferred?: VideoQuality): boolean | undefined {
	if (definition.height && preferred) return `${definition.height}p` === preferred;
}
