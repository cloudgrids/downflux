import { ErrorCodes, ProviderType } from '@types';
import { BaseException } from './BaseException';

export class HlsTokenExpiredException extends BaseException {
	constructor(provider: ProviderType, url: string) {
		super({
			errorCode: ErrorCodes.HLS_TOKEN_EXPIRED,
			message: `HLS URL expired or invalid token`,
			provider,
			context: { url }
		});
	}
}
