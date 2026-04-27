export class ServiceMismatchError extends Error {
	constructor(
		message: string,
		public readonly service: string
	) {
		super(message);
		this.name = 'ServiceMismatchError';
	}
}
