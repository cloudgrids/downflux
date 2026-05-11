import { ErrorCodes, ProviderType } from '@types';
import { BaseException } from './BaseException';

/**
 * @class InvalidUrlException
 * @throws Exception thrown when an invalid URL is encountered during download or API requests.
 * @notes Provides a consistent error structure for URL related issues across services.
 */
export class InvalidUrlException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly provider: ProviderType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.INVALID_URL,
			message: InvalidUrlException.buildMessage(url, provider, method),
			method: method,
			provider,
			context,
			metadata
		});
	}

	private static buildMessage(url: string, provider?: ProviderType, method?: string): string {
		return [`Invalid URL encountered`, `url=${url}`, `provider=${provider}`, method && `method=${method}`].filter(Boolean).join(' | ');
	}
}
