import { ProviderType } from '@app/shared';

export interface ProviderConfig {
	provider: ProviderType;
	urlPattern: RegExp;
}
