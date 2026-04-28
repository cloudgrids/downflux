import { ServiceType } from '../enums';

export const SERVICE_HEADERS: Partial<Record<ServiceType, Record<string, string>>> = {
	[ServiceType.OKPORN]: {
		Referer: 'https://ok.porn/',
		Origin: 'https://ok.porn',
		Accept: '*/*'
	}
};

export function resolveHeaders(
	service: ServiceType,
	baseHeaders: Record<string, string>,
	overrides?: Record<string, string>
): Record<string, string> {
	const serviceHeaders = SERVICE_HEADERS[service] ?? {};

	return {
		...baseHeaders,
		...serviceHeaders,
		...overrides
	};
}
