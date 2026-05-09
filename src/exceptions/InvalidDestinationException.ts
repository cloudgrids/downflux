import { ErrorCodes, ProviderType } from '@app/shared';
import { BaseException } from './BaseException';

/**
 * @class InvalidDestinationException
 * @throws Exception thrown when a invalid destination is provided by the user.
 * @notes Provides a consistent error structure for disk write related issues across services.
 */
export class InvalidDestinationException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly provider: ProviderType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.ENOENT,
			message: InvalidDestinationException.buildMessage(url, provider, method),
			method: method,
			provider,
			context,
			metadata
		});
	}

	private static buildMessage(path: string, provider?: ProviderType, method?: string): string {
		return [
			`ENOENT: Invalid destination`,
			`ERROR_CODE=${ErrorCodes.ENOENT}`,
			`path=${path}`,
			`provider=${provider}`,
			method && `identifier=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
