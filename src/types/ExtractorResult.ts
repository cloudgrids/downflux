import { UrlType } from '../enums';

export interface ExtractorResult {
	anchors: string[];
	images: string[];
	sources: string[];
	videoPosters?: string[];
	divHrefs?: string[];
	allUrls?: string[];
	title: string;
	customTitle?: string;
	description: string;
	keywords: string[];
	finalUrl: string;
	status: number;
	urlType?: UrlType;
}
