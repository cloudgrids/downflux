import { ErrorCodes, ProviderType } from '@app/shared';
import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
	constructor(provider: ProviderType, url: string, context?: Record<string, any>) {
		super({
			errorCode: ErrorCodes.HTTP_404,
			message: `Resource not found`,
			provider,
			context: {
				url,
				...context
			}
		});
	}
}
