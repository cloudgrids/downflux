export const pathBuilder = (...segments: string[]): string => {
	return segments.join('/');
};
