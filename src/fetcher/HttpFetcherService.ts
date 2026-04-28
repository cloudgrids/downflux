import { Dispatcher, Pool, interceptors } from 'undici';
import { IncomingHttpHeaders } from 'undici/types/header';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';
import { DownloadOptions } from '../downloaders';
import { HttpFetchOptions } from '../types/HttpFetchOptions';

export interface FetchResult {
	html: string;
	buffer: Buffer;
	finalUrl: string;
	status: number;
	ok: boolean;
	headers: Record<string, string>;
}

export class HttpFetcherService {
	private readonly DEFAULT_HEADERS: Record<string, string> = {
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Language': 'en-US,en;q=0.5',
		'Accept-Encoding': 'gzip, deflate, br',
		'Connection': 'keep-alive'
	};

	private readonly pools = new Map<string, Dispatcher>();

	private getPool(url: string): Dispatcher {
		const origin = new URL(url).origin;
		if (!this.pools.has(origin)) {
			const pool = new Pool(origin).compose(interceptors.redirect({ maxRedirections: 10 }));
			this.pools.set(origin, pool);
		}
		return this.pools.get(origin)!;
	}

	public async fetchHtml(url: string, opts: HttpFetchOptions): Promise<FetchResult> {
		const { headers = {}, timeoutMs = 30_000, retries = 3 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, ...headers } as Record<string, string>;
		let lastError: unknown;

		for (let attempt = 0; attempt < retries; attempt++) {
			try {
				const pool = this.getPool(url);
				const parsedUrl = new URL(url);

				const {
					statusCode,
					headers: resHeaders,
					body,
					context
				} = await pool.request({
					path: parsedUrl.pathname + parsedUrl.search,
					method: 'GET',
					headers: mergedHeaders,
					headersTimeout: timeoutMs,
					bodyTimeout: timeoutMs
				});

				const contextData = context as { history?: URL[] };
				const finalUrl = contextData?.history
					? contextData.history.length > 0
						? contextData.history[contextData.history.length - 1].toString()
						: url
					: url;
				const ok = statusCode >= 200 && statusCode < 300;

				const html = this.decodeBody(await this.readBody(body), resHeaders).toString('utf8');

				return {
					html,
					finalUrl,
					status: statusCode,
					ok,
					headers: this.headers(resHeaders),
					buffer: Buffer.from(html)
				};
			} catch (err) {
				lastError = err;
			}
		}

		throw lastError;
	}

	public async fetchBuffer(url: string, opts: DownloadOptions): Promise<FetchResult> {
		const { headers = {}, timeoutMs = 30_000 } = opts;
		const mergedHeaders = { ...this.DEFAULT_HEADERS, Accept: '*/*', Referer: opts.referer, ...headers } as Record<string, string>;
		const response = await fetch(url, {
			method: 'GET',
			headers: mergedHeaders,
			redirect: 'follow',
			signal: AbortSignal.timeout(timeoutMs)
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status} for ${response.url || url}`);
		}

		const finalUrl = response.url || url;
		const responseHeaders = this.fetchHeaders(response.headers);
		const contentType = responseHeaders['content-type']?.toLowerCase() ?? '';

		if (this.isHlsManifest(contentType, finalUrl)) {
			const manifest = await response.text();
			return await this.fetchHlsBuffer(manifest, finalUrl, url, mergedHeaders, timeoutMs);
		}

		const buffer = Buffer.from(await response.arrayBuffer());

		return {
			buffer,
			finalUrl,
			headers: responseHeaders,
			html: '',
			status: response.status,
			ok: true
		};
	}

	private async fetchHlsBuffer(
		manifest: string,
		manifestUrl: string,
		sourceUrl: string,
		headers: Record<string, string>,
		timeoutMs: number
	): Promise<FetchResult> {
		const variantUrl = this.selectHlsVariant(manifest, manifestUrl, sourceUrl);
		const mediaPlaylistUrl = variantUrl ?? manifestUrl;
		const mediaManifest = variantUrl && variantUrl !== manifestUrl ? await this.fetchText(variantUrl, headers, timeoutMs) : manifest;
		const segmentUrls = this.parseHlsSegmentUrls(mediaManifest, mediaPlaylistUrl);

		if (!segmentUrls.length) {
			throw new Error(`No HLS segments found for ${mediaPlaylistUrl}`);
		}

		const chunks: Buffer[] = [];
		for (const segmentUrl of segmentUrls) {
			const response = await fetch(segmentUrl, {
				method: 'GET',
				headers,
				redirect: 'follow',
				signal: AbortSignal.timeout(timeoutMs)
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status} for ${response.url || segmentUrl}`);
			}

			chunks.push(Buffer.from(await response.arrayBuffer()));
		}

		return {
			buffer: Buffer.concat(chunks),
			finalUrl: mediaPlaylistUrl,
			headers: {
				'content-type': 'video/mp2t'
			},
			html: '',
			status: 200,
			ok: true
		};
	}

	private async fetchText(url: string, headers: Record<string, string>, timeoutMs: number): Promise<string> {
		const response = await fetch(url, {
			method: 'GET',
			headers,
			redirect: 'follow',
			signal: AbortSignal.timeout(timeoutMs)
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status} for ${response.url || url}`);
		}

		return await response.text();
	}

	private isHlsManifest(contentType: string, finalUrl: string): boolean {
		return (
			contentType.includes('application/vnd.apple.mpegurl') ||
			contentType.includes('application/x-mpegurl') ||
			finalUrl.includes('.m3u8')
		);
	}

	private selectHlsVariant(manifest: string, manifestUrl: string, sourceUrl: string): string | null {
		const variants = this.parseHlsVariants(manifest, manifestUrl);
		if (!variants.length) return null;

		const sourceName = this.extractLastPathPart(sourceUrl);
		const matchingByName = sourceName ? variants.find((variant) => variant.url.includes(sourceName)) : undefined;
		if (matchingByName) return matchingByName.url;

		const preferredQuality = this.extractQualityLabel(sourceName);
		const matchingByQuality = preferredQuality ? variants.find((variant) => variant.url.includes(preferredQuality)) : undefined;
		if (matchingByQuality) return matchingByQuality.url;

		return variants[variants.length - 1]?.url ?? null;
	}

	private parseHlsVariants(manifest: string, baseUrl: string): Array<{ url: string }> {
		const lines = manifest
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter(Boolean);
		const variants: Array<{ url: string }> = [];

		for (let i = 0; i < lines.length; i++) {
			if (!lines[i].startsWith('#EXT-X-STREAM-INF')) continue;
			const nextLine = lines[i + 1];
			if (!nextLine || nextLine.startsWith('#')) continue;

			const resolved = this.resolveUrl(nextLine, baseUrl);
			if (resolved) variants.push({ url: resolved });
		}

		return variants;
	}

	private parseHlsSegmentUrls(manifest: string, baseUrl: string): string[] {
		return manifest
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter((line) => line && !line.startsWith('#'))
			.map((line) => this.resolveUrl(line, baseUrl))
			.filter((line): line is string => Boolean(line));
	}

	private extractLastPathPart(url: string): string {
		try {
			const parts = new URL(url).pathname.split('/').filter(Boolean);
			return parts[parts.length - 1] ?? '';
		} catch {
			return '';
		}
	}

	private extractQualityLabel(filename: string): string {
		const match = filename.match(/(\d{3,4}p)/i);
		return match?.[1]?.toLowerCase() ?? '';
	}

	private resolveUrl(raw: string, base: string): string | null {
		try {
			return new URL(raw, base).toString();
		} catch {
			return null;
		}
	}

	private async readBody(body: AsyncIterable<unknown>): Promise<Buffer> {
		const chunks: Buffer[] = [];
		for await (const chunk of body) {
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as ArrayBuffer));
		}
		return Buffer.concat(chunks);
	}

	private decodeBody(buffer: Buffer, headers: IncomingHttpHeaders): Buffer {
		const responseHeaders = this.headers(headers);

		const encoding = responseHeaders['content-encoding']?.toLowerCase();
		if (!encoding) return buffer;

		if (encoding.includes('gzip')) return gunzipSync(buffer);
		if (encoding.includes('deflate')) return inflateSync(buffer);
		if (encoding.includes('br')) return brotliDecompressSync(buffer);

		return buffer;
	}

	private headers(headers: IncomingHttpHeaders): Record<string, string> {
		const result: Record<string, string> = {};
		for (const [key, value] of Object.entries(headers)) {
			if (Array.isArray(value)) result[key] = value.join(', ');
			else if (value) result[key] = value;
		}
		return result;
	}

	private fetchHeaders(headers: Headers): Record<string, string> {
		return Object.fromEntries(headers.entries());
	}
}
