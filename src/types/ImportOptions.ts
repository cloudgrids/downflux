import { OutputType } from '../enums';
import { UrlType } from '../enums/UrlType';

export interface ImportOptions {
	/** href, src, data-src, data-lazy, data-original, source src, video poster, or all https?:// urls */
	urlType: UrlType;
	/** Buffer */
	outputType: OutputType;
	/** Extra headers forwarded to every request */
	headers?: Record<string, string>;
	/** Filter downloaded URLs by extension */
	allowedExtensions?: string[];
	/** Abort signal to cancel mid-run */
	signal?: AbortSignal;
}
