import { HttpFetcherService } from '../fetcher/HttpFetcherService';
import { SITE_EXTRACTORS } from '../helpers/SiteExtractors';
import { HtmlParserService } from '../parser/HtmlParserService';
import { ExecutionArguments } from '../types';
import { DefaultExtractorResult } from '../types/DefaultExtractorResult';
import { SiteDescriptor } from '../types/SiteDescriptor';

export abstract class BaseTransformer<T = DefaultExtractorResult> {
	constructor(
		protected readonly htmlParserService: HtmlParserService,
		protected readonly httpFetcherService: HttpFetcherService
	) {}

	private findTransformer(url: string): SiteDescriptor | null {
		return SITE_EXTRACTORS.find((d) => d.pattern.test(url)) ?? null;
	}

	public async transform(url: string, request?: ExecutionArguments): Promise<T> {
		const fetched = await this.httpFetcherService.fetchHtml(url, { referer: request?.entryUrl });

		const descriptor = this.findTransformer(url);
		const match = descriptor?.pattern.exec(url);

		const base = this.defaultParse(fetched.html, fetched.finalUrl);

		if (descriptor?.transform && match) {
			const transformed = descriptor.transform({
				html: fetched.html,
				finalUrl: fetched.finalUrl,
				parser: this.htmlParserService,
				match
			});

			return { ...base, ...transformed, urlType: descriptor.urlType, baseUrl: request?.entryUrl } as T;
		}

		return { ...base, urlType: descriptor?.urlType, baseUrl: request?.entryUrl } as T;
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
}
