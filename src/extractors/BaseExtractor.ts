import { UrlType } from '../enums';
import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { SITE_EXTRACTORS } from '../helpers/SiteExtractors';
import { HtmlParserService } from '../parser/HtmlParserService';
import { ExecutionArguments } from '../types';
import { DefaultExtractorResult } from '../types/DefaultExtractorResult';
import { SiteDescriptor } from '../types/SiteDescriptor';

export abstract class BaseExtractor<T = DefaultExtractorResult> {
	constructor(
		protected readonly htmlParserService: HtmlParserService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	public findExtractor(url: string): SiteDescriptor | null {
		return SITE_EXTRACTORS.find((d) => d.pattern.test(url)) ?? null;
	}

	public async extractFromUrl(url: string, _request?: ExecutionArguments): Promise<T> {
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

			return { ...base, ...transformed, urlType: descriptor.urlType } as T;
		}

		return { ...base, urlType: descriptor?.urlType } as T;
	}

	protected defaultParse(html: string, baseUrl: string): DefaultExtractorResult {
		return {
			anchors: this.htmlParserService.extractAnchors(html, baseUrl),
			images: this.htmlParserService.extractImageUrls(html),
			sources: this.htmlParserService.extractSourceUrls(html),
			title: this.htmlParserService.extractTitle(html),
			description: this.htmlParserService.extractMetaDescription(html),
			keywords: this.htmlParserService.extractMetaKeywords(html),
			baseUrl,
			status: 200
		};
	}

	public selectUrlsByQuality(result: DefaultExtractorResult, urlType: UrlType): string[] {
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
