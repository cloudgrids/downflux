import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

/**
 * @class InvalidDestinationException
 * @notes Exception thrown when a invalid destination is provided by the user.
 * @notes Provides a consistent error structure for disk write related issues across services.
 */
export class InvalidDestinationException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.ENOENT,
			message: InvalidDestinationException.buildMessage(url, service, method),
			method: method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(path: string, service?: ServiceType, method?: string): string {
		return [
			`ENOENT: Invalid destination`,
			`ERROR_CODE=${ErrorCodes.ENOENT}`,
			`path=${path}`,
			service && `service=${service}`,
			method && `identifier=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
