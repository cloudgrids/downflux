import { TagKeys } from '../../types';
import { OkPornIdType } from '../services';

export interface TagFilterOptions {
	/** List of tags for filtering*/
	tagKeys?: TagKeys[];

	/** Format of the tags output*/
	format?: OkPornIdType;
}
