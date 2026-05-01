/**
 * Output structure for OkPorn tag operations.
 * Contains tags grouped by key.
 */
export interface OkPornTagOutput {
	/** Tags grouped by tag key */
	tags: TagsOutput;
}

/** Mapping of tag keys to tag values */
export type TagsOutput = Record<string, string[]>;
