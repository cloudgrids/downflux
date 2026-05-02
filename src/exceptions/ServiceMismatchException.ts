import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

/**
 * @class ServiceMismatchException
 * @throws Exception thrown when a URL does not match the expected service pattern.
 * @notes Provides a consistent error structure for service mismatch issues across services.
 */
export class ServiceMismatchException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.SERVICE_MISMATCH,
			message: ServiceMismatchException.buildMessage(url, service, method),
			method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(url: string, service?: ServiceType, method?: string): string {
		return [`Service mismatch encountered`, `url=${url}`, service && `service=${service}`, method && `method=${method}`]
			.filter(Boolean)
			.join(' | ');
	}
}
