import { OutputType, ServiceType } from '../../enums';
import { DownloadOptions } from '../downloaders';

export interface CreateSinkInput {
	service: ServiceType;
	type: OutputType;
	dOptions: DownloadOptions;
	directoryPath?: string;
	filename: string;
	identifier: string;
}
