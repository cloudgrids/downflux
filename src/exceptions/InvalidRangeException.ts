import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

/**
 * @class InvalidRangeException
 * @throws Exception thrown when an invalid range is provided for operations that require a start and end value
 * @notes Provides a consistent error structure for range related issues across services.
 */
export class InvalidRangeException extends BaseException {
	constructor(
		public readonly start: number,
		public readonly end: number,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.INVALID_RANGE,
			message: InvalidRangeException.buildMessage(start, end, service, method),
			method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(start: number, end: number, service?: ServiceType, method?: string): string {
		return [
			`Invalid range encountered`,
			`ERROR_CODE=${ErrorCodes.INVALID_RANGE}`,
			`start=${start}`,
			`end=${end}`,
			service && `service=${service}`,
			method && `method=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
