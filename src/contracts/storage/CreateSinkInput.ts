import { OutputType, ProviderType } from '@app/shared';
import { TranscodeOptions } from './TranscodeOptions';

export interface CreateSinkInput {
	provider: ProviderType;
	type: OutputType;
	transCodeOptions?: TranscodeOptions;
	directoryPath?: string;
	filename: string;
	identifier: string;
	noDownload?: boolean; // Optional flag to indicate if the sink is being created for a no-download scenario (metadata extraction only)
}
