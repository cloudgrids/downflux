import { extname } from 'path';

export class HtmlParserService {
  public extractElementText(html: string, begin: string, end: string, fallback = ''): string {
    const start = html.indexOf(begin);
    if (start === -1) return fallback;
    const from = start + begin.length;
    const to = html.indexOf(end, from);
    if (to === -1) return fallback;
    return html.slice(from, to);
  }

  /**
   * Extract text between two landmarks starting at `pos`.
   * Returns [value, nextPos] so calls can be chained through a document.
   *
   * @example
   * const [title, pos1] = extractElementTextPair(html, '<h1>', '</h1>', 0);
   * const [desc,  pos2] = extractElementTextPair(html, '<p>',  '</p>',  pos1);
   */
  public extractElementTextPair(html: string, begin: string, end: string, pos = 0): [string | null, number] {
    const start = html.indexOf(begin, pos);
    if (start === -1) return [null, pos];
    const from = start + begin.length;
    const to = html.indexOf(end, from);
    if (to === -1) return [null, pos];
    return [html.slice(from, to), to + end.length];
  }

  public *extractAllPairs(html: string, begin: string, end: string): Generator<string> {
    let pos = 0;
    const blen = begin.length;
    const elen = end.length;
    while (true) {
      const start = html.indexOf(begin, pos);
      if (start === -1) break;
      const from = start + blen;
      const to = html.indexOf(end, from);
      if (to === -1) break;
      yield html.slice(from, to);
      pos = to + elen;
    }
  }

  /**
   * Extract multiple named fields sequentially through an HTML string.
   *
   * gallery-dl equivalent: text.extract_all(txt, rules, pos)
   */
  public extractAll(
    html: string,
    rules: Array<[key: string, begin: string, end: string]>,
    startPos = 0,
  ): [Record<string, string>, number] {
    let pos = startPos;
    const result: Record<string, string> = {};
    for (const [key, begin, end] of rules) {
      const [value, nextPos] = this.extractElementTextPair(html, begin, end, pos);
      if (key && value !== null) result[key] = value;
      pos = nextPos;
    }
    return [result, pos];
  }

  // ─── DOM-element extractors ──────────────────────────────────────────────────

  /** Extract all href values from <a href="..."> and <a href='...'> tags. */
  public extractAnchors(html: string, baseUrl?: string): string[] {
    const seen = new Set<string>();
    for (const delimiter of ['"', "'"]) {
      for (const raw of this.extractAllPairs(html, `href=${delimiter}`, delimiter)) {
        const url = this.resolveUrl(raw.trim(), baseUrl);
        if (url) seen.add(url);
      }
    }
    return [...seen];
  }

  /** Extract image URLs from src / data-src / data-lazy / data-original. */
  public extractImageUrls(html: string): string[] {
    const attrs = ['data-original="', 'data-src="', 'data-lazy="', 'src="'];
    const seen = new Set<string>();
    for (const attr of attrs) {
      for (const url of this.extractAllPairs(html, attr, '"')) {
        if (url.startsWith('http')) seen.add(url);
      }
    }
    return [...seen];
  }

  public extractSourceUrls(html: string): string[] {
    const urls: string[] = [];
    for (const url of this.extractAllPairs(html, '<source src="', '"')) {
      if (url.startsWith('http')) urls.push(url);
    }
    return [...new Set(urls)];
  }

  public extractVideoPosters(html: string): string[] {
    const urls: string[] = [];
    for (const url of this.extractAllPairs(html, 'poster="', '"')) {
      if (url.startsWith('http')) urls.push(url);
    }
    return [...new Set(urls)];
  }

  public extractDivHrefs(html: string): string[] {
    const urls: string[] = [];
    const re = /<div[^>]+href="([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      if (m[1]) urls.push(m[1]);
    }
    return [...new Set(urls)];
  }

  /** Extract <video src="..."> URLs. */
  public extractVideoUrls(html: string): string[] {
    const urls: string[] = [];
    const re = /<video[^>]*src="([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      if (m[1].startsWith('http')) urls.push(m[1]);
    }
    return [...new Set(urls)];
  }

  /** Extract all http/https URLs found anywhere in the document. */
  public extractAllUrls(html: string): string[] {
    return [...html.matchAll(/https?:\/\/[^\s"'<>\\]+/g)].map((m) => m[0]);
  }

  public extractMetaDescription(html: string): string {
    return this.decodeHtmlEntities(
      this.extractElementText(html, 'name="description" content="', '"') ||
        this.extractElementText(html, "name='description' content='", "'") ||
        this.extractElementText(html, 'name=description content="', '"'),
    );
  }

  public extractMetaKeywords(html: string): string[] {
    const raw =
      this.extractElementText(html, 'name="keywords" content="', '"') ||
      this.extractElementText(html, "name='keywords' content='", "'");
    return raw
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
  }

  public extractTitle(html: string): string {
    return this.decodeHtmlEntities(this.extractElementText(html, '<title>', '</title>'));
  }

  public resolveUrl(raw: string, base?: string): string | null {
    if (!raw) return null;
    try {
      return new URL(raw, base).toString();
    } catch {
      return null;
    }
  }

  /** Extract filename and extension from a URL path. */
  public getFilenameAndExtensionFromUrl(url: string): { filename: string; extension: string } {
    try {
      const pathname = new URL(url).pathname.split('?')[0];
      const filename = pathname.split('/').pop() ?? '';
      const extension = extname(filename).substring(1);

      if (extension) {
        return { filename: filename.slice(0, -extension.length - 1), extension };
      }
      return { filename: filename, extension: '' };
    } catch {
      return { filename: `file-${Date.now()}`, extension: '' };
    }
  }

  public decodeHtmlEntities(str: string): string {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
  }

  public resolveMimeFromExtension(ext: string): string {
    const map: Record<string, string> = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      webp: 'image/webp',
      mp4: 'video/mp4',
      webm: 'video/webm',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
    };
    return map[ext.toLowerCase()] ?? 'application/octet-stream';
  }
}

export const parser = new HtmlParserService();
