import { ExecutionArguments } from '../..';
import { VideoQuality } from '../../../enums';
import { TagFilterOptions } from '../../common';

export type OkPornIdType = 'url' | 'path';

export interface OkPornExecArgs extends ExecutionArguments {
	videoArgs?: VideoQuality[];
	tagArgs?: TagFilterOptions;
	channelArgs?: OkPornIdType;
	modelArgs?: OkPornIdType;
}
