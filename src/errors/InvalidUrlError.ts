import { ServiceType } from '../enums';
import { SERVICE_METHODS } from '../helpers/Mappers';

export class InvalidUrlError extends Error {
	constructor(
		public readonly url: string,
		public readonly service?: ServiceType,
		public readonly method?: SERVICE_METHODS
	) {
		super(InvalidUrlError.buildMessage(url, service, method));
		this.name = 'InvalidUrlError';

		// Fix prototype chain (important in TS when extending Error)
		Object.setPrototypeOf(this, new.target.prototype);
	}

	private static buildMessage(url: string, service?: ServiceType, method?: SERVICE_METHODS): string {
		let message = `Invalid URL: ${url}`;

		if (service) {
			message += ` | Service: ${service}`;
		}

		if (method) {
			message += ` | Method: ${method}`;
		}

		return message;
	}
}
