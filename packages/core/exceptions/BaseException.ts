import { ErrorCodes, ProviderType } from '@types';

export interface ExceptionPayload<TMeta = any> {
	errorCode: ErrorCodes;
	message: string;
	provider: ProviderType;
	method?: string;
	context?: Record<string, any>;
	metadata?: TMeta;
}

/**
 * @class Exception
 * The base exception class for all custom exceptions in the application.
 * Provides a consistent structure for error information, including error codes, context, and metadata.
 */
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
