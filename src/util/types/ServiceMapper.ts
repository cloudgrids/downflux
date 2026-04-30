import { CoomerMethods, DefaultMethods, OkPornMethods, ServiceType } from '../enums';

export type SERVICE_METHODS = {
	[ServiceType.OKPORN]: OkPornMethods;
	[ServiceType.COOMER]: CoomerMethods;
	[ServiceType.DEFAULT]: DefaultMethods;
};
