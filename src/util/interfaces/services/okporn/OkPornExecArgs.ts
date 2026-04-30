import { VideoQuality } from '../../../enums';
import { ExecutionArguments, TagFilterOptions } from '../../common';

export type OkPornIdType = 'url' | 'path';

export interface OkPornVideoExecArgs {
	allowedQualities?: VideoQuality[];
	format?: OkPornIdType;
}

export interface OkPornExecArgs extends ExecutionArguments {
	videoArgs?: OkPornVideoExecArgs;
	tagArgs?: TagFilterOptions;
	channelArgs?: OkPornIdType;
	modelArgs?: OkPornIdType;
}
