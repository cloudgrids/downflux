import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

export class InvalidUrlException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.INVALID_URL,
			message: InvalidUrlException.buildMessage(url, service, method),
			method: method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(url: string, service?: ServiceType, method?: string): string {
		return [`Invalid URL encountered`, `url=${url}`, service && `service=${service}`, method && `method=${method}`]
			.filter(Boolean)
			.join(' | ');
	}
}
