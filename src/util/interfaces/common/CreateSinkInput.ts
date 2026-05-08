import { OutputType, ServiceType } from '../../enums';
import { TranscodeOptions } from './TranscodeOptions';

export interface CreateSinkInput {
	service: ServiceType;
	type: OutputType;
	transCodeOptions?: TranscodeOptions;
	directoryPath?: string;
	filename: string;
	identifier: string;
	noDownload?: boolean; // Optional flag to indicate if the sink is being created for a no-download scenario (metadata extraction only)
}
