import { CoomerMethods, DefaultMethods, OkPornMethods, ProviderType } from '@app/shared';

export type PROVIDER_METHODS = {
	[ProviderType.OkPorn]: OkPornMethods;
	[ProviderType.Coomer]: CoomerMethods;
	[ProviderType.Default]: DefaultMethods;
};
