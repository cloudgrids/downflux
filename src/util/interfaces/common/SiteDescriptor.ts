import { HtmlParserService } from '../../../parser';
import { UrlType } from '../../enums';
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
