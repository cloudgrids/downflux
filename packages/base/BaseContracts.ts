import { TagKeys } from '@contracts';

/**
 * Options for filtering tag output.
 * Used by tag-based service operations.
 */
export interface TagFilterOptions {
	/** Allowed tag keys */
	allowedKeys?: TagKeys[];

	/**
	 * Output format for tag values
	 * @defaultValue 'path'
	 */
	format?: 'path' | 'url';
}
