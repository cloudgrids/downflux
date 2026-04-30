import { ExecutionArguments } from '../..';
import { VideoQuality } from '../../../enums';
import { TagFilterOptions } from '../../common';

export type OkPornChannelArgs = 'url' | 'channel';

export interface OkPornExecArgs extends ExecutionArguments {
	videoArgs?: VideoQuality[];
	tagArgs?: TagFilterOptions;
	channelArgs?: OkPornChannelArgs;
}
