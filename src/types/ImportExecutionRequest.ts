import { OutputType, UrlType } from '../enums';
import { ImportCallbacks } from './ImportCallBacks';
import { ImportExecutionOptions } from './ImportExecutionOptions';

export interface ImportExecutionRequest extends ImportExecutionOptions {
	urls: string[];
	baseUrl: string;
	urlType: UrlType;
	outputType: OutputType;
	callbacks?: ImportCallbacks;
}
