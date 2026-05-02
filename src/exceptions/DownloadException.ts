import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

export class DownloadException extends BaseException {
	constructor(
		public readonly url: string,
		public readonly service: ServiceType,
		public readonly method?: string,
		public readonly context: Record<string, any> = {},
		public readonly metadata?: any
	) {
		super({
			errorCode: ErrorCodes.DOWNLOAD_FAILED,
			message: DownloadException.buildMessage(url, service, method),
			method: method,
			service,
			context,
			metadata
		});
	}

	private static buildMessage(path: string, service?: ServiceType, method?: string): string {
		return [
			`Invalid Destination encountered`,
			`ERROR_CODE=${ErrorCodes.DOWNLOAD_FAILED}`,
			`path=${path}`,
			service && `service=${service}`,
			method && `method=${method}`
		]
			.filter(Boolean)
			.join(' | ');
	}
}
