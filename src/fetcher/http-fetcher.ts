/**
 * fetcher/http-fetcher.ts
 *
 * Lightweight HTTP fetcher — replaces browser.newPage() + page.goto().
 * Uses Node's native fetch (Node 18+). Zero extra dependencies.
 */

import { fetch, Pool } from 'undici';
import type { FetchOptions } from '../types';

export interface FetchResult {
  html: string;
  finalUrl: string;
  status: number;
  ok: boolean;
  headers: Record<string, string>;
}

export class HttpFetcher {
  private readonly DEFAULT_HEADERS: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
  };

  private readonly pools = new Map<string, Pool>();

  private getPool(url: string): Pool {
    const origin = new URL(url).origin;
    if (!this.pools.has(origin)) {
      this.pools.set(origin, new Pool(origin));
    }
    return this.pools.get(origin)!;
  }

  /** Fetch a URL and return raw HTML with retry + timeout. */
  public async fetchHtml(url: string, opts: FetchOptions = {}): Promise<FetchResult> {
    const { headers = {}, timeoutMs = 30_000, retries = 3, backoffMs = 400 } = opts;
    const mergedHeaders = { ...this.DEFAULT_HEADERS, ...headers };
    let lastError: unknown;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(url, {
          headers: mergedHeaders as HeadersInit,
          redirect: 'follow',
          signal: controller.signal,
          dispatcher: this.getPool(url),
        });

        clearTimeout(timer);

        const html = await response.text();
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => { responseHeaders[key] = value; });

        return { html, finalUrl: response.url, status: response.status, ok: response.ok, headers: responseHeaders };
      } catch (err) {
        lastError = err;
        if (attempt < retries - 1) await this.sleep(backoffMs * (attempt + 1));
      }
    }

    throw lastError;
  }

  /** Fetch binary content (images, video) and return as a Buffer. */
  public async fetchBuffer(url: string, opts: FetchOptions = {}): Promise<Buffer> {
    const { headers = {}, timeoutMs = 60_000, retries = 3, backoffMs = 400 } = opts;
    const mergedHeaders = { ...this.DEFAULT_HEADERS, 'Accept': '*/*', ...headers };
    let lastError: unknown;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(url, {
          headers: mergedHeaders as HeadersInit,
          redirect: 'follow',
          signal: controller.signal,
          dispatcher: this.getPool(url),
        });

        clearTimeout(timer);

        if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      } catch (err) {
        lastError = err;
        if (attempt < retries - 1) await this.sleep(backoffMs * (attempt + 1));
      }
    }

    throw lastError;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const fetcher = new HttpFetcher();
