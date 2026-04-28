import { ServiceType } from '../enums';
import { CoomerMethods } from '../enums/services/CoomerMethods';
import { DefaultMethods } from '../enums/services/DefaultMethods';
import { OkPornMethods } from '../enums/services/OkPornMethods';

export type SERVICE_METHODS = {
	[ServiceType.OKPORN]: OkPornMethods;
	[ServiceType.COOMER]: CoomerMethods;
	[ServiceType.DEFAULT]: DefaultMethods;
};
