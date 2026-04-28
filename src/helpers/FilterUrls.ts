import { DEFAULT_ALLOWED_EXTENSIONS } from './DefaultExtensions';

export const filterUrlsByExtension = (urls: string[], allowed: string[] = DEFAULT_ALLOWED_EXTENSIONS): string[] => {
	try {
		return [
			...new Set(
				urls.filter((url) => {
					const pathname = url.split('?')[0];
					const ext = `.${pathname.split('.').pop()?.toLowerCase()}`;
					return allowed.includes(ext);
				})
			)
		];
	} catch (error) {
		console.error('Error filtering URLs by extension:', error);
		return [];
	}
};
