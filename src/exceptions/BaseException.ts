import { ServiceType } from '../enums';
import { ErrorCodes } from '../enums/ErrorCodes';

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
