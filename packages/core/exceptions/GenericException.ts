import { ErrorCodes, Provider } from '@types';
import { BaseException } from './BaseException';

/**
 * @class GenericException
 * @throws A generic exception for invalid arguments or missing parameters in provider methods.
 * Provides a consistent error structure for argument-related issues across services.
 */
export class GenericException extends BaseException {
	constructor(
		public readonly message: string,
		public readonly provider: Provider,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.GENERIC_ERROR,
			message: GenericException.buildMessage(message, provider, method),
			method: method,
			provider,
			context,
			metadata
		});
	}

	private static buildMessage(message: string, provider?: Provider, method?: string): string {
		return [
			`ENOENT: Invalid arguments`,
			`ERROR_CODE=${ErrorCodes.GENERIC_ERROR}`,
			`message=${message}`,
			`provider=${provider}`,
			method && `identifier=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
