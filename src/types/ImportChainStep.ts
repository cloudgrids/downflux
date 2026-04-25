import { UrlType } from '../enums';

export interface ImportChainStep {
	method: string;
	args?: Record<string, unknown> | unknown[];
	url?: string;
	urlType?: UrlType;
	shouldDownload?: boolean;
}
