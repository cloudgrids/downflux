import { TagKeys } from '../../types';

export interface TagFilterOptions {
	/** List of tags for filtering*/
	tagKeys?: TagKeys[];

	/** Format of the tags output*/
	format?: 'url' | 'tag';
}
