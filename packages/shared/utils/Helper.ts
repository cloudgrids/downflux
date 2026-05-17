export class Helper {
	public shake<T extends Record<string, any>>(obj: T, filter?: (value: T[keyof T]) => boolean): Partial<T> {
		const result: Partial<T> = {};

		for (const [key, value] of Object.entries(obj)) {
			if (filter ? filter(value) : !!value) {
				result[key as keyof T] = value;
			}
		}
		return result;
	}
}
