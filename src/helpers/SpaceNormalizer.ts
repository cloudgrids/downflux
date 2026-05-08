export const spaceNormalizer = (input: string): string => {
	return input?.replace(/[^a-zA-Z0-9]/g, '_')?.trim() || input || 'unknown';
};
