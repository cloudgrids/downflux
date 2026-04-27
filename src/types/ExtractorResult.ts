import { UrlType } from '../enums';

export interface ExtractorResult<TExtendedMetadata = any> {
	title: string;
	description: string;
	keywords: string[];
	status: number;
	baseUrl: string;
	anchors: string[];
	images: string[];
	sources: string[];
	videoPosters?: string[];
	divHrefs?: string[];
	allUrls?: string[];
	urlType?: UrlType;
	customFields?: Record<string, any>;
	extra?: TExtendedMetadata;
}
