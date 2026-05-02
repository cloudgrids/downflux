import { BaseException } from './BaseException';

import { ErrorCodes, ServiceType } from '../util';
/**
 * @class GenericException
 * @throws A generic exception for invalid arguments or missing parameters in service methods.
 * @notes Provides a consistent error structure for argument-related issues across services.
 */
export class GenericException extends BaseException {
	constructor(
		public readonly message: string,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.GENERIC_ERROR,
			message: GenericException.buildMessage(message, service, method),
			method: method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(message: string, service?: ServiceType, method?: string): string {
		return [
			`ENOENT: Invalid arguments`,
			`ERROR_CODE=${ErrorCodes.GENERIC_ERROR}`,
			`message=${message}`,
			service && `service=${service}`,
			method && `identifier=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
