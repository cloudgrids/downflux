import { UrlType } from '../enums/UrlType';
import { HtmlParserService } from '../parser/HtmlParserService';
import { DefaultExtractorResult } from './DefaultExtractorResult';

export interface SiteDescriptor {
	category: string;
	pattern: RegExp;
	urlType?: UrlType;
	transform?: (ctx: {
		html: string;
		finalUrl: string;
		parser: HtmlParserService;
		match: RegExpMatchArray;
	}) => Partial<DefaultExtractorResult>;
}
