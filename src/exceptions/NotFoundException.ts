import { ErrorCodes, ServiceType } from '../util';
import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
	constructor(service: ServiceType, url: string, context?: Record<string, any>) {
		super({
			errorCode: ErrorCodes.HTTP_404,
			message: `Resource not found`,
			service,
			context: {
				url,
				...context
			}
		});
	}
}
