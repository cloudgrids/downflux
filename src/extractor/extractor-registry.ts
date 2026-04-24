/**
 * extractor/extractor-registry.ts
 *
 * gallery-dl extractor/__init__.py pattern:
 * - Each site is a descriptor with a `pattern` and optional `transform`.
 * - find(url) picks the first matching descriptor.
 * - extract(url) fetches + parses in one call.
 */

import { fetcher } from '../fetcher/http-fetcher';
import { parser } from '../parser';
import { ExtractorResult, FetchOptions, UrlType } from '../types';

export interface SiteDescriptor {
  category: string;
  pattern: RegExp;
  urlType?: UrlType;
  transform?: (html: string, match: RegExpMatchArray, baseUrl: string) => Partial<ExtractorResult>;
}

export class ExtractorRegistry {
  private readonly SITE_EXTRACTORS: SiteDescriptor[] = [
    {
      category: 'okporn',
      pattern: /(?:https?:\/\/)?(?:www\.)?ok\.porn\/albums\/(\d+)/,
      urlType: UrlType.IMAGES,
      transform: (html) => ({
        images: [...html.matchAll(/data-original="(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
        title: parser.decodeHtmlEntities(parser.extractElementText(html, 'h1 class=title>', '</h1>')),
        description: parser.extractMetaDescription(html),
        keywords: parser.extractMetaKeywords(html),
      }),
    },
    {
      category: 'coomer',
      pattern: /https?:\/\/coomer\.(?:st|party)\/([^/]+)\/user\/([^/?#]+)/,
      urlType: UrlType.ANCHORS,
    },
    {
      category: 'kemono',
      pattern: /https?:\/\/kemono\.(?:su|party)\/([^/]+)\/user\/([^/?#]+)/,
      urlType: UrlType.ANCHORS,
    },
    {
      category: 'wallhaven',
      pattern: /https?:\/\/wallhaven\.cc\/w\/([a-zA-Z0-9]+)/,
      urlType: UrlType.IMAGES,
      transform: (html) => ({
        images: parser.extractImageUrls(html).filter((u) => u.includes('w.wallhaven.cc')),
      }),
    },
    {
      category: 'shorts',
      pattern: /https?:\/\/(?:www\.)?shorts\.xxx\/(?:video|embed)\/(\d+)/,
      urlType: UrlType.SOURCES,
      transform: (html) => ({
        sources: parser.extractSourceUrls(html),
        images: parser.extractVideoPosters(html),
      }),
    },
    {
      category: 'generic',
      pattern: /^https?:\/\//,
      urlType: UrlType.ANCHORS,
    },
  ];

  public findExtractor(url: string): SiteDescriptor | null {
    for (const descriptor of this.SITE_EXTRACTORS) {
      if (descriptor.pattern.test(url)) return descriptor;
    }
    return null;
  }

  public async extractFromUrl(url: string, opts?: FetchOptions): Promise<ExtractorResult> {
    const fetched = await fetcher.fetchHtml(url, opts);
    const html = fetched.html;
    const baseUrl = fetched.finalUrl;
    const descriptor = this.findExtractor(url);
    const match = url.match(descriptor?.pattern ?? /^https?:\/\//);

    const base: ExtractorResult = {
      anchors: parser.extractAnchors(html, baseUrl),
      images: parser.extractImageUrls(html),
      sources: parser.extractSourceUrls(html),
      title: parser.extractTitle(html),
      description: parser.extractMetaDescription(html),
      keywords: parser.extractMetaKeywords(html),
      html,
      finalUrl: baseUrl,
      status: fetched.status,
    };

    if (descriptor?.transform && match) {
      return { ...base, ...descriptor.transform(html, match, baseUrl) };
    }

    return base;
  }

  public selectUrlsByQuality(result: ExtractorResult, urlType: UrlType): string[] {
    switch (urlType) {
      case UrlType.ANCHORS:
        return result.anchors;
      case UrlType.IMAGES:
        return result.images;
      case UrlType.SOURCES:
        return result.sources;
      case UrlType.VIDEO_POSTER:
        return parser.extractVideoPosters(result.html);
      case UrlType.DIV_HREFS:
        return parser.extractDivHrefs(result.html);
      case UrlType.ALL_URLS:
        return parser.extractAllUrls(result.html);
      default:
        return result.anchors;
    }
  }
}

export const extractor = new ExtractorRegistry();
