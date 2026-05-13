import { DownloadOptions } from '@contracts';
import { ProgressManager } from '@core/progress';
import { HEADER_PRESETS } from '@shared';
import { Agent, Headers, fetch as UFetch } from 'undici';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib';

export abstract class BaseHttpClient {
	constructor(protected readonly progressManager: ProgressManager) {}

	protected readonly cookieJar = new Map<string, Map<string, string>>();
	protected readonly CHROME_CIPHERS = [
		'TLS_AES_128_GCM_SHA256',
		'TLS_AES_256_GCM_SHA384',
		'TLS_CHACHA20_POLY1305_SHA256',
		'ECDHE-ECDSA-AES128-GCM-SHA256',
		'ECDHE-RSA-AES128-GCM-SHA256',
		'ECDHE-ECDSA-AES256-GCM-SHA384',
		'ECDHE-RSA-AES256-GCM-SHA384',
		'ECDHE-ECDSA-CHACHA20-POLY1305',
		'ECDHE-RSA-CHACHA20-POLY1305',
		'ECDHE-RSA-AES128-SHA',
		'ECDHE-RSA-AES256-SHA',
		'AES128-GCM-SHA256',
		'AES256-GCM-SHA384',
		'AES128-SHA',
		'AES256-SHA'
	].join(':');

	protected readonly agent = new Agent({
		connect: {
			ciphers: this.CHROME_CIPHERS,
			honorCipherOrder: true,
			minVersion: 'TLSv1.2',
			maxVersion: 'TLSv1.3',
			ALPNProtocols: ['h2', 'http/1.1']
		}
	});

	protected randomHeaders(extra: Record<string, string> = {}) {
		const preset = HEADER_PRESETS[Math.floor(Math.random() * HEADER_PRESETS.length)];

		return {
			...preset,
			...extra
		};
	}

	protected async delay(attempt: number) {
		const base = 300;
		const jitter = Math.random() * 200;
		const delay = base * 2 ** attempt + jitter;
		return new Promise((res) => setTimeout(res, delay));
	}

	protected async readBody(body: ReadableStream<Uint8Array> | null): Promise<Buffer> {
		if (!body) return Buffer.alloc(0);

		const reader = body.getReader();
		const chunks: Buffer[] = [];

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(Buffer.from(value));
		}

		return Buffer.concat(chunks);
	}

	protected decodeBody(buffer: Buffer, headers: Headers): Buffer {
		const enc = headers.get('content-encoding')?.toLowerCase();

		if (!enc) return buffer;

		try {
			if (enc.includes('gzip')) return gunzipSync(buffer);
			if (enc.includes('deflate')) return inflateSync(buffer);
			if (enc.includes('br')) return brotliDecompressSync(buffer);
		} catch {
			return buffer;
		}

		return buffer;
	}

	protected applyCookieWithHeader(url: string, headers: Record<string, string>): Record<string, string> {
		const host = new URL(url).hostname;
		const hostCookies = this.cookieJar.get(host);

		if (!hostCookies || hostCookies.size === 0) return headers;

		const cookie = Array.from(hostCookies.entries())
			.map(([name, value]) => `${name}=${value}`)
			.join('; ');

		if (!cookie) return headers;

		return { ...headers, Cookie: cookie };
	}

	protected storeCookies(url: string, headers: Headers): void {
		const host = new URL(url).hostname;
		const existing = this.cookieJar.get(host) ?? new Map<string, string>();

		const cookies = ((headers as unknown as { getSetCookie?: () => string[] }).getSetCookie?.() ?? []) as string[];

		for (const raw of cookies) {
			const [pair] = raw.split(';');
			if (!pair) continue;

			const eq = pair.indexOf('=');
			if (eq <= 0) continue;

			const name = pair.slice(0, eq).trim();
			const value = pair.slice(eq + 1).trim();
			if (!name) continue;

			existing.set(name, value);
		}

		if (existing.size > 0) this.cookieJar.set(host, existing);
	}

	protected addOriginWithHeader(headers: Record<string, string>, referer?: string): Record<string, string> {
		if (!referer) return headers;
		if (headers.Origin || headers.origin) return headers;

		try {
			return { ...headers, Origin: new URL(referer).origin };
		} catch {
			return headers;
		}
	}

	protected headers(headers: Headers): Record<string, string> {
		return Object.fromEntries(headers.entries());
	}

	protected isTransportError(error: unknown): string | undefined {
		const e = error as { code?: string; cause?: { code?: string } };
		const code = e?.code ?? e?.cause?.code;
		return [
			'ECONNRESET',
			'ECONNREFUSED',
			'ETIMEDOUT',
			'EPIPE',
			'UND_ERR_SOCKET',
			'UND_ERR_CONNECT_TIMEOUT',
			'UND_ERR_HEADERS_TIMEOUT'
		].find((c) => c === String(code));
	}

	protected async fetchWithTransportFallback(
		url: string,
		init: Parameters<typeof UFetch>[1],
		allowFallback: boolean = true
	): ReturnType<typeof UFetch> {
		try {
			return await UFetch(url, { ...init, dispatcher: this.agent });
		} catch (error) {
			const transportError = this.isTransportError(error);
			if (!allowFallback || !transportError) throw error;

			this.progressManager.update({ message: `Primary transport failed, retrying with default transport CODE: ${transportError}` });
			return UFetch(url, init);
		}
	}

	public async fetchText(url: string, timeoutMs: number, headers: Record<string, any>): Promise<string> {
		return (await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers })).text();
	}

	public async fetchJson(url: string, opts: DownloadOptions) {
		const headers = this.addOriginWithHeader(
			this.randomHeaders({ ...opts.headers, Referer: opts?.referer ?? url }),
			opts?.referer ?? url
		);

		try {
			const data = await fetch(url, {
				method: 'GET',
				signal: AbortSignal.timeout(opts?.timeoutMs ?? 30_0000),
				headers
			});

			return data.json();
		} catch (error) {
			const transportError = this.isTransportError(error);
			if (transportError) {
				this.progressManager.update({ message: `Transport error occurred: ${transportError}` });
			}

			throw new Error('JSON parsing failed', { cause: error });
		}
	}
}
