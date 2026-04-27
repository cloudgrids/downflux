export class InvalidRangeError extends Error {
	constructor(
		message: string,
		public readonly range: string
	) {
		super(message);
		this.name = 'InvalidRangeError';
	}
}
