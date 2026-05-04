import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

export class HlsTokenExpiredException extends BaseException {
	constructor(service: ServiceType, url: string) {
		super({
			errorCode: ErrorCodes.HLS_TOKEN_EXPIRED,
			message: `HLS URL expired or invalid token`,
			service,
			context: { url }
		});
	}
}
