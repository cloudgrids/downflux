import { PornHubMediaDefinition, ServiceFetchStrategy } from '../util';

export const PornHubFetchStrategy: ServiceFetchStrategy = {
	shouldFallback404: (url) => url.includes('phncdn.com'),

	getFallbackUrl: (url) => {
		console.log('Checking if fallback URL is needed for URL[Switching CDN]:', url);
		if (url.includes('iv-h')) return url.replace('iv-h', 'ev-h');
		if (url.includes('ev-h')) return url.replace('ev-h', 'iv-h');
		return null;
	},

	shouldReExtract: (url) => {
		console.log('Checking if re-extraction is needed for URL:', url);
		return url.includes('phncdn.com') && url.includes('.m3u8');
	},

	shouldResolveTextResponse: (url, contentType) => {
		console.log('Checking if text response is needed to be resolved for URL:', url, 'with content type:', contentType);
		return (
			(url.includes('/get_file/') || url.includes('/get_media')) &&
			(contentType.includes('text/') || contentType.includes('application/json'))
		);
	},

	getDirectVideoUrlFromText: (body, preferredQuality) => {
		console.log('Attempting to resolve direct video URL from text response with preferred quality:', preferredQuality);

		const normalized = body.replace(/\\\//g, '/').replace(/&amp;/g, '&');

		console.log('Normalized text response for URL resolution');

		try {
			const definitions = JSON.parse(normalized) as PornHubMediaDefinition[];
			if (Array.isArray(definitions)) {
				console.log('Parsed media definitions from text response:', definitions.length, 'definitions found');

				const mp4Definitions = definitions.filter((definition) => definition.format === 'mp4' && definition.videoUrl);
				const preferred = preferredQuality
					? mp4Definitions.find((definition) => normalizeQuality(definition) === preferredQuality)
					: undefined;

				return (
					preferred?.videoUrl ??
					mp4Definitions.find((definition) => definition.defaultQuality)?.videoUrl ??
					mp4Definitions[0]?.videoUrl ??
					null
				);
			}
		} catch {
			// Fall back to EXTRACTING a URL from non-JSON text responses.
		}

		const match = normalized.match(/https?:\/\/[^\s"'<>\\]+\.mp4(?:\?[^\s"'<>\\]*)?/i);
		return match?.[0] ?? null;
	}
};

function normalizeQuality(definition: PornHubMediaDefinition): string | undefined {
	const quality = Array.isArray(definition.quality) ? definition.quality[0] : definition.quality;
	if (quality) return quality.endsWith('p') ? quality : `${quality}p`;
	if (definition.height) return `${definition.height}p`;

	return undefined;
}
