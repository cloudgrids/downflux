import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

export class InvalidDestinationException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.INVALID_URL,
			message: InvalidDestinationException.buildMessage(url, service, method),
			method: method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(path: string, service?: ServiceType, method?: string): string {
		return [`ENOENT: Invalid destination`, `path=${path}`, service && `service=${service}`, method && `identifier=${method}`]
			.filter(Boolean)
			.join(' | ');
	}
}
