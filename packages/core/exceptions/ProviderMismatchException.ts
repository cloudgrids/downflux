import { ErrorCodes, ProviderType } from '@types';
import { BaseException } from './BaseException';

/**
 * @class ProviderMismatchException
 * @throws Exception thrown when a URL does not match the expected provider pattern.
 * @notes Provides a consistent error structure for provider mismatch issues across services.
 */
export class ProviderMismatchException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly provider: ProviderType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.SERVICE_MISMATCH,
			message: ProviderMismatchException.buildMessage(url, provider, method),
			method,
			provider,
			context,
			metadata
		});
	}

	private static buildMessage(url: string, provider?: ProviderType, method?: string): string {
		return [`provider mismatch encountered`, `url=${url}`, provider && `provider=${provider}`, method && `method=${method}`]
			.filter(Boolean)
			.join(' | ');
	}
}
