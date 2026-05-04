import { CoomerMethods, DefaultMethods, OkPornMethods, ServiceType } from '../enums';

export type SERVICE_METHODS = {
	[ServiceType.OkPorn]: OkPornMethods;
	[ServiceType.Coomer]: CoomerMethods;
	[ServiceType.Default]: DefaultMethods;
};
