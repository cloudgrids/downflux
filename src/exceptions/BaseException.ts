import { ErrorCodes, ServiceType } from '../util';

export interface ExceptionPayload<TMeta = any> {
	errorCode: ErrorCodes;
	message: string;
	service: ServiceType;
	method?: string;
	context?: Record<string, any>;
	metadata?: TMeta;
}

export class BaseException<TMeta = any> extends Error {
	public readonly errorCode: ErrorCodes;
	public readonly context: Record<string, any>;
	public readonly metadata?: TMeta;

	constructor(payload: ExceptionPayload<TMeta>) {
		super(payload.message);

		this.name = new.target.name;
		this.errorCode = payload.errorCode;
		this.context = payload.context || {};
		this.metadata = payload.metadata;
		this.stack = undefined; // Stack traces can be misleading for custom exceptions, so we omit them by default

		Object.setPrototypeOf(this, new.target.prototype);
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			errorCode: this.errorCode,
			context: this.context,
			metadata: this.metadata
		};
	}
}
