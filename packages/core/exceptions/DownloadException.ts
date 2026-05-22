import { ErrorCodes, Provider } from '@types';
import { BaseException } from './BaseException';

/**
 * @class DownloadException
 * @throws Exception throw when a download operation fails due to an invalid url or network issues.
 * Provides a consistent error structure for download related issues across services.
 */
export class DownloadException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly provider: Provider,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.DOWNLOAD_FAILED,
			message: DownloadException.buildMessage(url, provider, method),
			method: method,
			provider,
			context,
			metadata
		});
	}

	private static buildMessage(path: string, provider?: Provider, method?: string): string {
		return [
			`Unable to download resource`,
			`ERROR_CODE=${ErrorCodes.DOWNLOAD_FAILED}`,
			`path=${path}`,
			`provider=${provider}`,
			method && `method=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
