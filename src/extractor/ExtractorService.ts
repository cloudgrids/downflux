import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { SITE_EXTRACTORS } from '../helpers/site-extractors';
import { HtmlParserService } from '../parser/HtmlParserService';
import { ExtractorResult, UrlType } from '../types';
import { SiteDescriptor } from '../types/SiteDescriptor';

export class ExtractorService {
	constructor(
		private readonly htmlParserService: HtmlParserService,
		private readonly httpFetcherService: HttpFetcherService
	) {}

	public findExtractor(url: string): SiteDescriptor | null {
		return SITE_EXTRACTORS.find((d) => d.pattern.test(url)) ?? null;
	}

	public async extractFromUrl(url: string): Promise<ExtractorResult> {
		const fetched = await this.httpFetcherService.fetchHtml(url);

		const descriptor = this.findExtractor(url);
		const match = descriptor?.pattern.exec(url);

		const base = this.defaultParse(fetched.html, fetched.finalUrl);

		if (descriptor?.transform && match) {
			const transformed = descriptor.transform({
				html: fetched.html,
				finalUrl: fetched.finalUrl,
				parser: this.htmlParserService,
				match
			});

			return { ...base, ...transformed, urlType: descriptor.urlType };
		}

		return { ...base, urlType: descriptor?.urlType };
	}

	private defaultParse(html: string, finalUrl: string): ExtractorResult {
		return {
			anchors: this.htmlParserService.extractAnchors(html, finalUrl),
			images: this.htmlParserService.extractImageUrls(html),
			sources: this.htmlParserService.extractSourceUrls(html),
			title: this.htmlParserService.extractTitle(html),
			description: this.htmlParserService.extractMetaDescription(html),
			keywords: this.htmlParserService.extractMetaKeywords(html),
			finalUrl,
			status: 200
		};
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
				return result.videoPosters ?? [];

			case UrlType.DIV_HREFS:
				return result.divHrefs ?? [];

			case UrlType.ALL_URLS:
				return result.allUrls ?? [];

			default:
				return result.images;
		}
	}
}
