import { ErrorCodes, ProviderType } from '@types';
import { BaseException } from './BaseException';

/**
 * @class InvalidRangeException
 * @throws Exception thrown when an invalid range is provided for operations that require a start and end value
 * Provides a consistent error structure for range related issues across services.
 */
export class InvalidRangeException extends BaseException {
	constructor(
		public readonly start: number,
		public readonly end: number,
		public readonly provider: ProviderType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.INVALID_RANGE,
			message: InvalidRangeException.buildMessage(start, end, provider, method),
			method,
			provider,
			context,
			metadata
		});
	}

	private static buildMessage(start: number, end: number, provider?: ProviderType, method?: string): string {
		return [
			`Invalid range encountered`,
			`ERROR_CODE=${ErrorCodes.INVALID_RANGE}`,
			`start=${start}`,
			`end=${end}`,
			`provider=${provider}`,
			method && `method=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
