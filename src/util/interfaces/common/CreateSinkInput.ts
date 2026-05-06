import { OutputType, ServiceType } from '../../enums';

export interface CreateSinkInput {
	service: ServiceType;
	type: OutputType;
	directoryPath?: string;
	filename: string;
	identifier: string;
}
